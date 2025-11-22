# Use the official Playwright image (Includes Node.js & Browsers)
FROM mcr.microsoft.com/playwright:v1.48.0-jammy

# 1. Install Python3 and Pip
RUN apt-get update && apt-get install -y python3 python3-pip

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy backend files
COPY package*.json ./
COPY requirements.txt ./

# 4. Install Dependencies (Node & Python)
RUN npm install
# We use --break-system-packages to allow installing global python packages in this specific docker environment
RUN pip3 install -r requirements.txt --break-system-packages

# 5. Install Playwright Browsers for Python (Ensure they are available)
RUN playwright install chromium

# 6. Copy the rest of your backend code
COPY . .

# 7. Expose the port Render uses
EXPOSE 3001

# 8. Start the server
CMD ["node", "server.js"]