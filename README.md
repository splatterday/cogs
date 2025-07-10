# COGS

> **Mission Statement**  
> Here I try to push up the most important parts of Discogs inventory management, the stuff I use regularly.

## Summary

Cogs is a Next.js + Tailwind app that talks to the Discogs API so you can search artists/releases/masters, view cover art, and build your own want-list and collection.  
It’s containerized with Docker and comes with both local (npm) and containerized workflows.

---

## 🚀 Built With

- 🖥️ **Next.js** (App Router + Server Components)  
- 💅 **Tailwind CSS** for styling  
- 🐳 **Docker** / Docker Compose for containerization  
- 🔒 Discogs API for data  

---

## 🔧 Prerequisites

- **Node.js** ≥18 (includes npm)  
- **npm** (comes with Node)  
- **Docker** & **docker-compose** _(optional, only for container workflows)_  

---

## ⚙️ Local Setup (Non-Docker)

1. **Clone the repo**  
   ```bash
   git clone https://github.com/your-org/cogs.git
   cd cogs

2. **Create your env file**
   cp .env.example .env.local
   then open .env.local and add your Discogs token:
   DISCOGS_PERSONAL_TOKEN=YOUR_TOKEN_HERE

3. **Install dependencies and run**
   ```bash
    npm install
    npm run dev

4. **Open http://localhost:3000 in your browser.**

---

## 🐋 Docker
We support a multi-stage Docker build for production, plus a docker-compose.yml for dev with live-reload.

1. Build the image
    ```bash
      docker build -t cogs-app .
    ```
  - Optionally pass your token at build-time instead of baking it in:
    ```bash
        docker build \
        --build-arg DISCOGS_PERSONAL_TOKEN=$DISCOGS_PERSONAL_TOKEN \
        -t cogs-app .
    ```
2. Run the container
- Without extra flags (if your token is baked into the image):
  ```bash
  docker run -p 3000:3000 cogs-app
  ```
- With runtime env var (best practice—no secrets in image):

  ```bash
  docker run -p 3000:3000 \
    -e DISCOGS_PERSONAL_TOKEN=$DISCOGS_PERSONAL_TOKEN \
    cogs-app
  ```
3. browse to http://localhost:3000.
