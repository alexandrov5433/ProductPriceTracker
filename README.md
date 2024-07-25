## Installation guide
1. Run "npm install" in the derectory of the root file.
2. Go to the options in Google Chrome, then to “Extensions” and click on “Manage Extensions”. Or simply type “chrome://extensions/” in to the address bar and hit enter.
3. In the upper left corner click “Load unpacked”, navigate to the directory chosen by you and select the “Product Price Tracker” folder, which you extracted in step 1, and click “Select Folder/Open”. Success! You have just installed “Product Price Tracker” in your personal browser.
Additionally: You can pin the extension to the top right corner of the browser for optimal usage. You can remove any extension by clicking the “Remove” button of the one you want to delete, found in the same page from step 2.

## How to use
Click on the extension icon in the top right corner. A pop-up appears with 2 buttons. From here you can either add a new product, the price of which should be tracked, or view the already saved products. The “Add Product” button should only be clicked while you have the web page of the product open, which you wish to add. When on the page, after clicking “Add Product”, please click on the name (title), then on the price (on the whole euro part, if there are cents in the price) and lastly on the image of the desired product, exactly in this order. Please have in mind that not all images you see act only as image elements (in the sense of functionality of the website). This may cause the extension to save the wrong image, but no worries; you can always edit the saved product. If you want to add the same product from the same page again, please refresh the page of the product before clicking “Add Product”. The “View Products” button will display all saved products. There you can see actual prices, edit the name and image address of each product from the “Edit” button, delete, see the price development from the “Price Log” and visit the source website. With the “Check and Update Prices” button on the top the extension will check for price updates, update them if necessary and make a new entry in the price log. This may take 1 or 2 seconds.
If there are no saved products the application will ask you if you want to load some data for a demonstration. I you do not want to do that simply add a new product, as described above, and the message will disappear automatically.

# Data and Privacy
## Demo data sources
The data (found in demoData.json) used for the demonstration of the functionality is property of the source websites, easily reachable from the button “Visit Website”. “Product Price Tracker” does not claim any ownership of this data. A marginal amount of it was changed/extended for demonstrational purposes by the creator of the application.

## User privacy
The “Product Price Tracker” application does not collect any user data. It has access to all tabs only for the user to be able to add a product (script injection). Background communication with websites is done only with webpages the user has added, in order to check for price updates. This happens automatically when the user opens the products view or by his request from the “Check and Update Prices” button.
