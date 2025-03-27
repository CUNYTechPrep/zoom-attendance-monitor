# Zoom Attendance Monitor

Web application for monitoring zoom webhook events

> [!NOTE]
> This project starter requires Node.js v22.14.0 (LTS) or newer to work properly. The project makes use of features not available in older versions such as ECMAScript/JavaScript modules ([ESM](https://nodejs.org/docs/latest-v20.x/api/esm.html)), node [watch mode](https://nodejs.org/docs/latest-v20.x/api/cli.html#--watch), and node [env-file support](https://nodejs.org/docs/latest-v20.x/api/cli.html#--env-fileconfig).
>
> LTS ([long-term support](https://nodejs.org/en/about/previous-releases#nodejs-releases)) versions (v22) of Node.js are recommended for use with this starter.

### Running the app locally

> [!IMPORTANT]
> For local development you will need two terminals open, one for the backend-api and another for the frontend-client.

_Clone_ this app, then:

```bash
# backend-api terminal 1
cd backend
cp .env.example .env
# in the .env file update the DATABASE_URL env var with your PostgreSQL connection string
npm install
npm run dev
```

```bash
# frontend-client terminal 2
cd frontend
npm install
npm run dev
```

- backend-api will launch at: http://localhost:8080
- frontend-client will launch at: http://localhost:5173


### Setting Up Zoom Webhooks

> [!IMPORTANT]
> Before connecting with Zoom you will need to install the `ngrok` cli tool. See [their download page](https://ngrok.com/downloads/mac-os) for download and
install instructions. You will also need to create an account [on their signup page here](https://dashboard.ngrok.com/signup)

1. Set up your ngrok authtoken. You can go to https://dashboard.ngrok.com/get-started/your-authtoken after creating an account and logging in
and using this command to set it up:
   ```shell
   ngrok config add-authtoken <YOUR_AUTHTOKEN>
   ```
2. Start the backend with `npm run dev`
3. Create the http tunnel with ngrok with the command: `ngrok http 8080`. You should see output similar to:
  ```shell
  ngrok
                                                                                                                                                                      
  👋 Goodbye tunnels, hello Agent Endpoints: https://ngrok.com/r/aep                                                                                                    
                                                                                                                                                                        
  Session Status                online                                                                                                                                  
  Account                       Alberto Franco (Plan: Free)                                                                                                             
  Version                       3.22.0                                                                                                                                  
  Region                        United States (us)                                                                                                                      
  Latency                       32ms                                                                                                                                    
  Web Interface                 http://127.0.0.1:4040                                                                                                                   
  Forwarding                    https://ed55-98-14-185-181.ngrok-free.app -> http://localhost:8080                                                                      
                                                                                                                                                                        
  Connections                   ttl     opn     rt1     rt5     p50     p90                                                                                             
                                0       0       0.00    0.00    0.00    0.00
  ```
2. Log into the [Zoom Marketplace](https://marketplace.zoom.us/) with your personal Zoom account
3. After signing in, click on the `Develop` bottom on the top right hand side of the screen (near your profile/account picture)
and select `Build App`
4. In the modal that appears, select `Webhook only App`
5. In the next modal, give this app a name (for this I used `CTP Attendance Monitor`)
6. On the next page, fill out all the details in the form (i.e.: Short description, company name, email, etc) and click the `Continue` button when you're done
7. In the next screen, you should see a `Secret Token` and a `Verification Token`
   * The `Secret Token` should be saved in the `ZOOM_WEBHOOK_SECRET_TOKEN=` environment in your `.env` file
8. Turn on the `Event Subscriptions` option on the same page.
   * Fill out the form   