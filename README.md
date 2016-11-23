# wp-to-shopify-intercom-converter

## Overview

### Problem

You're switching from Wordpress/WooCommerce to Shopify, but use Intercom and have the Intercom `user_id` for all of your user records set to a Wordpress `user_login` value. When you cutover to Shopify and enable Intercom, Intercom will use Shopify based user ID's to track users. This means you'll lose all of your existing user history (since new user records will be created instead of re-using existing user records).

### Solution

This app (script) can be used to:

1. Connect to your Shopify store via the Shopify API and get a list of all existing customers.
2. Connect to your Intercom account (via their API) and update all user records that match your Shopify user records by email, setting the Intercom `user_id` to be a Shopify user ID.

## Installation

### Prerequisites

1. You must have [Meteor](https://meteor.com) installed.
2. You must have a Shopify private app API key and password.
3. You must have an Intercom personal access token.

```
git clone https://github.com/hwillson/wp-to-shopify-intercom-converter.git
cd wp-to-shopify-intercom-converter; meteor npm install
SHOPIFY_ADMIN_URL=X SHOPIFY_API_KEY=X SHOPIFY_API_PASS=X INTERCOM_PAT=X meteor
```

## Running

```
meteor shell
import Converter from '/imports/api/converter/converter';
Converter.run()
```
