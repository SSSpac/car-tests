hello, here we have a simple Next.js project, written with typescript. the main purpose of the project is to display multiplle cars in the home page, each car with its own information, and a buttong that give the user the ability to add the chosen car to the favorite page by simply clicking the "favoutie button".

 There is also a second page, that wen clicked it will show you the favorites cars from the home page. there are 5 components that these tests are designed for, each with its own folder.

Basicaly you rended a list of cars with its model, year, price and so on (you include the car informations in a types folder and import them to the component), it shows a message that says no favorite cars, only when the aray is empty, also each car item is clickable and calls, and it has a remove car button that calls "onRemoveFavorite".

 it also includes a navigation links bak to the home page. the most important thing is the rendering logic, the components must display the correct data. You can run the tests (all of them will fail since the components arnt included but you can use the comman: npm run test (to run all the tests from every page at the same times), or use npx jest (filename).test.tsx to run each test page seperatly)

git push/