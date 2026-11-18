Terminal portfolio. Next.js reads and writes `content/site.json`.

```bash
cp .env.local.example .env.local
npm install
npm run dev
```

Site: http://localhost:3000  
Admin: http://localhost:3000/admin

The admin password is `ADMIN_TOKEN`. Saving updates `content/site.json` on the machine that runs the server. GitHub Pages cannot host that write path. `master` of this repo stays the previous site until this branch is merged.
