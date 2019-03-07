# Keep or Cancel for the Chase Sapphire Reserve (CSR)

Version 2.0 is live as of 2/21/19, fully functional and deployed at: https://kocv2.herokuapp.com/

Version 1.0 of the site. Deployed on Netlify, no backend, simply Vanilla JS and Bootstrap.

## ABOUT:

Many friends and family members ask me about whether or not it's worth keeping this card, I wrote this calculator to give them the most objective advice possible. 

## WHY:

Boasting a cash sign up bonus in excess of $1,000 and for most it was an easy choice of whether or not to sign up for the card **for the first year**

However, after the first year's sign up bonus, the question of whether or not it was worthwhile to pay the whopping $450 became more difficult. 

Most of the advice I saw online fell into one of two oversimplified and generally unhelpful camps: (A) "the card is so good, the bank is paying you to use this card" or (B) "$450 is way too much to pay for a credit card, cancel it!"

Enter this guide.

## HOW:

This site is a step by step walkthrough aimed at helping people less fluent in the world of rewards credit cards to determine the value proposition of the CSR from year 1 and beyond.

Each question has a corresponding drop down box which can provide guidance to those who want to see what each benefit is, as well as my personal reccomendations if you don't know how to value them.

At the end, you will be taken to a page with a calculated result verdict. 

This verdict will compare the estimated output (based on your input) with a replacement level 2% cashback card to see if it is worthwhile to continue holding onto the CSR and paying $450. Calculating the opportunity cost of using this card is an essential and oft forgotten part of making decisions.

For completeness sake, there is an option to use the Freedom Unlimited. If the box is ticked, the calculator will assume optimized spending -- where you switching between the two (every dollar spent *not* in a 3X category will be spent with the Freedom Unlimited), you can see the sum value returned by holding and using both cards. 

Note: While one could argue that including the Freedom 5% card(s) or INK+/Cash could give a more accurate picture of the cards value, it's important to remember that 5X/5% cashback is the realistic ceiling for earnings - regardless of the value of the points so there should be no effect on your decision to pay for the CSR.

## Version Notes:

Version 2.0 Update:  Application is now fullstack with Node/Express and a MongoDB backend. Site is currently live and deployed at: https://kocv2.herokuapp.com/.
Site also includes Helmet, rate-limiter, and templating (EJS).   

Version 2.0.1 Include some simple testing with Cypress, a very cool framework that removes really every excuse against writing tests for code.