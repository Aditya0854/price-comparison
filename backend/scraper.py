# #  ----------- MAIN VERSION----------
import sys
import json
import asyncio
from playwright.async_api import async_playwright
from thefuzz import fuzz

# Timeout configuration
TIMEOUT_MS = 60000 

async def scrape_amazon(page, product_name):
    sys.stderr.write(f"--> Starting Amazon scrape for: {product_name}\n")
    results = []
    try:
        await page.goto(f"https://www.amazon.in/s?k={product_name}", timeout=TIMEOUT_MS, wait_until="domcontentloaded")
        
        try:
            await page.wait_for_selector('div[data-component-type="s-search-result"]', timeout=10000)
        except:
            sys.stderr.write("--> Amazon: No search results container found.\n")
            return []

        items = page.locator('div[data-component-type="s-search-result"]')
        count = await items.count()
        
        sys.stderr.write(f"--> Amazon: Found {count} potential items. Processing...\n")

        for i in range(min(10, count)):
            item = items.nth(i)
            try:
                # --- TITLE ---
                title_el = item.locator("h2").first
                title = await title_el.inner_text(timeout=2000)
                
                # --- PRICE ---
                price_el = item.locator(".a-price-whole").first
                if await price_el.count() == 0: 
                    sys.stderr.write(f"    [Amazon] Item {i+1} Skipped: No Price Found\n")
                    continue
                price = "₹" + await price_el.inner_text(timeout=2000)
                
                # --- IMAGE ---
                image = "https://placehold.co/200x200?text=No+Image"
                img_el = item.locator("img.s-image").first
                if await img_el.count() > 0:
                    image = await img_el.get_attribute("src", timeout=2000)

                # --- LINK ---
                link = ""
                link_el = item.locator("a.a-link-normal").first
                if await link_el.count() == 0:
                     link_el = item.locator("a.a-text-normal").first

                if await link_el.count() > 0:
                    link = "https://amazon.in" + await link_el.get_attribute("href", timeout=2000)
                else:
                    sys.stderr.write(f"    [Amazon] Item {i+1} Skipped: No Link Found\n")
                    continue

                results.append({
                    "id": f"amz_{i}",
                    "store": "Amazon",
                    "name": title,
                    "price": price,
                    "image": image,
                    "link": link,
                    "available": True
                })
                sys.stderr.write(f"    [Amazon] Item {i+1} Success: {title[:15]}...\n")
            except Exception as e:
                sys.stderr.write(f"    [Amazon] Item {i+1} Failed: {str(e).split('Logs')[0]}\n")
                continue
                
    except Exception as e:
        sys.stderr.write(f"--> Amazon Error: {str(e)}\n")
    
    sys.stderr.write(f"--> Amazon Finished. Extracted {len(results)} items.\n")
    return results

async def scrape_flipkart(page, product_name):
    sys.stderr.write(f"--> Starting Flipkart scrape for: {product_name}\n")
    results = []
    try:
        await page.goto(f"https://www.flipkart.com/search?q={product_name}", timeout=TIMEOUT_MS, wait_until="domcontentloaded")
        
        try:
            close_btn = page.locator('button._2KpZ6l._2doB4z')
            if await close_btn.count() > 0: await close_btn.click()
        except: pass

        items = page.locator('div[data-id]')
        count = await items.count()
        sys.stderr.write(f"--> Flipkart: Found {count} potential items. Processing...\n")

        for i in range(min(10, count)):
            item = items.nth(i)
            try:
                # Title
                title_el = item.locator("div.KzDlHZ, div._4rR01T, a.wjcEIp").first
                title = await title_el.inner_text(timeout=2000)
                
                # Price
                price_el = item.locator("div.Nx9bqj, div._30jeq3").first
                if await price_el.count() == 0: 
                    sys.stderr.write(f"    [Flipkart] Item {i+1} Skipped: No Price Found\n")
                    continue
                price = await price_el.inner_text(timeout=2000)
                
                # Image
                image = "https://placehold.co/200x200?text=No+Image"
                img_el = item.locator("img").first
                if await img_el.count() > 0:
                    image = await img_el.get_attribute("src", timeout=2000)
                
                # Link
                link_el = item.locator("a").first
                link = "https://www.flipkart.com" + await link_el.get_attribute("href", timeout=2000)

                results.append({
                    "id": f"flp_{i}",
                    "store": "Flipkart",
                    "name": title,
                    "price": price,
                    "image": image,
                    "link": link,
                    "available": True
                })
                sys.stderr.write(f"    [Flipkart] Item {i+1} Success: {title[:15]}...\n")
            except Exception as e:
                sys.stderr.write(f"    [Flipkart] Item {i+1} Failed: {str(e).split('Logs')[0]}\n")
                continue
    except Exception as e:
        sys.stderr.write(f"--> Flipkart Error: {str(e)}\n")
    
    sys.stderr.write(f"--> Flipkart Finished. Extracted {len(results)} items.\n")
    return results

async def main():
    product_name = " ".join(sys.argv[1:])
    sys.stderr.write(f"--> Launching Browser for query: {product_name}\n")
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context(viewport={'width': 1366, 'height': 768})
        
        page1 = await context.new_page()
        page2 = await context.new_page()

        amazon_data, flipkart_data = await asyncio.gather(
            scrape_amazon(page1, product_name),
            scrape_flipkart(page2, product_name)
        )
        
        sys.stderr.write("--> Closing Browser...\n")
        await browser.close()

        sys.stderr.write("--> Matching Products...\n")
        
        matched_pairs = []
        used_flipkart_ids = set()

        for amz_item in amazon_data:
            best_match = None
            best_score = 0
            best_flp_id = None

            for flp_item in flipkart_data:
                if flp_item['id'] in used_flipkart_ids: continue
                score = fuzz.token_set_ratio(amz_item['name'].lower(), flp_item['name'].lower())
                
                if score > best_score:
                    best_score = score
                    best_match = flp_item
                    best_flp_id = flp_item['id']

            if best_match and best_score > 60:
                matched_pairs.append({
                    "amazon": amz_item,
                    "flipkart": best_match,
                    "score": best_score
                })
                used_flipkart_ids.add(best_flp_id)
            else:
                matched_pairs.append({
                    "amazon": amz_item,
                    "flipkart": None,
                    "score": 0
                })

        # --- SORTING LOGIC (NEW) ---
        # Sorts list so highest score (100) comes first
        matched_pairs.sort(key=lambda x: x['score'], reverse=True)

        print(json.dumps(matched_pairs))
        sys.stderr.write("--> Done. Data sent to Node.js.\n")

if __name__ == "__main__":
    asyncio.run(main())

# ---------------------------------------------- MAIN VERSION END -----------