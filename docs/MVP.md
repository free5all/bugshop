# Minimum Viable Product:

> A minimal platform where breeders can list arthropods for sale, and buyers can browse, search, contact sellers, and leave simple feedback.

## Core
1. User Authentication
2. User Profiles
    - Display name, location, profile image
    - Role: Breeder / Hobbyist / Retailer
    - Optional: "About Me" section
3. List a species for sale
    - Anybody can list items for sale.
    - Form for users to post a listing
    - Fields: species name (autocompleted), price, quantity, media upload (image/video), care level, sex/stage, description
    - Availability Status: In Stock, on hold, sold
4. Species Catalog (with Search + Filter)
    - Basic Search: species name, price range
    - FIlters: life stage (e.g. sling, sub-adult, adult), sex, price, seller rating
5. Public Listing View
    - Show listing info, images, seller profile
    - Contact/"inquire" button.
6. Seller Dashboard
    - Manage listings: add/edit/delete
    - View inquiries/messages
    - Toggle availability
7. Basic messaging system
    - Allow buyers to message shops (not individual users) directly
    - Notifications (in-dashboard as well as email after a delay)
8. Reviews (thumbs up + comment)
    - For sellers at first, not individual listings
    - After confirmed sale (manual for now)
9. Admin panel
    - Flag or remove listings
    - Ban users if needed
    - Manage species taxonomy entries

## Nice to Have
1. Wishlist / Favorites
    - Save listings or breeders for later
    - Save species and set alerts when something becomes available!
2. Notifications
    - When a favorited seller posts something new
3. I Have / I Want tool
    - Helps pair up buyers and sellers passively

# Core Concepts
1. User
    - Represents a single person (auth-able account)    
    - Can belong to zero or more storefronts
    - Can buy arthropods (cart, checkout, orders)
    - Can message other users
    - Can manage storefronts ONLY if they have a managerial role in one
2. Storefront
    - Represents a seller's public-facing 'shop' (can be a single breeder, team, business, etc)
    - Can have multiple users (e.g. multiple admins, employees)
    - Must be connected to a Stripe Account for payout (perhaps i should explore low-friction methods of payout. TransferWise supports a nice api for payouts directly to a debit card)
    - Owns listings
    - Owns orders
3. UserStorefront (many-to-many table)
    - Role `owner`, `manager`, `employee`, etc.
    - Permissions can be based on role

# Stripe Integration Overview (light)
1. Connect Stripe account to storefront
    - When a user creates a storefront, prompt them to connect a Stripe Express/Standard account
    - store the `stripe_account_id` in the Storefront table
2. Buyer pays sellers via checkout session
    - Use stripe connect: Buyer pays -> funds go to sellers stripe account
    - Use stripe automatic fee splitting for the platform cut
3. Cart + Checkout
    - Cart stores imtes across **one storefront only** (initially simpler, no cross-storefront carts for now)
    - Order confirmation page + Stripe webhooks for payment status
4. Emails:
    - Send emails to:
        - Buyer (order confirmation, order updates)
        - Seller/Storefront (new order received)
        - Optionally: Shipment updates, stripe payout status

# Roles and Permissions
| Action            | Who can do it                                            |
| ----------------- | -------------------------------------------------------- |
| Create Storefront | Any authenticated User                                   |
| Add listing       | Users with `owner` or `manager` roles on that storefront |
| Connect Stripe    | `owner` only                                             |
| Manage orders     | `owner` or `manager`                                     |
| Buy               | Any authenticated user                                   |
| Leave Review      | Buyer after the order is marked as `completed`           |

# Authentication Flow
Logged in user sees
   - Buy interface
   - "My Storefronts" tab if they're a part of any
   - "Create Storefront" option
   - "Manage Listings / Orders" if theyre a part of a storefront