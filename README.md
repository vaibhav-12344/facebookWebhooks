# facebookWebhooks
Facebook Ad Lead Notifications with Node.js & Webhooks

web server to receive the webhook requests from Facebook every time a new lead submits their information

Paste the Page Access Token from the previous step into the FACEBOOK_PAGE_ACCESS_TOKEN variable.

Enter your CUSTOM_WEBHOOK_VERIFY_TOKEN in place of custom_verify_token.

Run the server using node server.js and Test out the webhook functionality with ngrok by running ngrox http 3000

Facebook Ad Lead Notifications with Node.js 
& Webhooks
`Prerequisite:
Facebook Page
Facebook Developer access

How it works:
Implementation:
- Create a Facebook app and select Manage business 
integrations as the app purpose.
- Generate a never expiring access token.
1. Go to https://developers.facebook.com/tools/explorer, select 
your app in ‘Meta app’ dropdown and your page name in ‘User 
or Page’ dropdown.
2. Add these permissions
- pages_show_list
- ads_management
- ads_read
- leads_retrieval
- pages_read_engagement
- pages_manage_metadata
- pages_manage_ads
3. Replace URL with me?fields=access_token or 
1234567890?fields=access_token in place of 1234567890 put id 
of your page which you will find in your Facebook profile URL.
4. Copy ‘acess_token’ and paste it in the Access Token field at the 
top of the Page replacing the Access Token that was previously 
there.
5. Click on the blue information icon to the left of the access token.
6. In the Access Token Information dialog, click on the 'Open in 
Access Token Tool' button at the bottom right of the dialog.
7. In the Access Token Debugger that will open up, click on the 
'Extend Access Token' button at the bottom of the page. A new 
access token should be displayed and the text above it should 
say that it never expires.
Setting Up the Node.js Server
- Set up a basic web server to receive the webhook requests 
from Facebook every time a new lead submits their information.
- Create a file server.js and paste the contents of this file 
https://github.com/vaibhav12344/facebookWebhooks/blob/mai
n/server.js.
- Paste the Page Access Token from the previous step into 
the FACEBOOK_PAGE_ACCESS_TOKEN variable.
- Enter your CUSTOM_WEBHOOK_VERIFY_TOKEN in place
of custom_verify_token.
- Run the server using node server.js.
- Test out the webhook functionality with ngrok by running ngrox 
http 3000.
Enabling the Lead Gen Webhook:
1. Visit the Facebook Developer Centre, select your app, scroll down 
to Webhooks and click Set Up.
2. Paste in the https forwarding address from ngrok , followed 
by /webhook.
3. Enter CUSTOM_WEBHOOK_VERIFY_TOKEN.
4. Click Verify and Save.
Search for the leadgen webhook, and click Test next to it, followed 
by Send to My Server. Observe the terminal which is running server.js
for the following error output: This error is expected in this case, as 
Facebook has sent us an invalid Lead ID ( 444444444444). For now, 
ignore the error and click Subscribe to receive leadgen webhook 
events.
We now need to manually subscribe for the leadgen webhook event for 
the specific page we are advertising. Execute the following curl command 
in your terminal of choice, replacing INSERT_PAGE_ID with your Page 
ID (from your Facebook Page URL) 
and INSERT_PAGE_ACCESS_TOKEN with the Page Access Token 
(which you generated previously). E.g. curl -X POST 
https://graph.facebook.com/v14.0/PAGE_ID/subscribed_apps?access_t
oken=page_access_token -H Content-Type: application/json -d 
subscribed_fields=leadgen.
Check for a {"success": true} response.
Time to Test
1. Go to https://developers.facebook.com/tools/lead-ads-testing.
2. Click on create lead button, fill up the form then click on next and submit
3. If all went well, the Node.js console output should show the lead details!
