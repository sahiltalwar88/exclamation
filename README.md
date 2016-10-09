# README

This project was inspired by a serendipitous meeting during the Zoohackathon of 2016.
While my teammates - @csaminak, @jootse84, and @nevillelauren - and I worked on a separate app at the hackathon (which we hope to release an alpha version of soon!), some members of the LAGA and Eagle groups from Uganda and Cameroon visited the National Zoo and told the group about what they did and some of the challenges they faced.

One of the challenges they highlighted in particular was that they have very little specialized technology to support their jobs. In particular, this becomes especially problematic when they get into difficult or even dangerous situations. When this happens, they're currently forced to rely on tools like WhatsApp to manually tell their colleagues their location and ask for help.

Hearing this story inspired my teammates and I to take immediate action. We believe that wildlife trafficking is a serious issue sorely in need of attention at the international stage - and nowhere is that clearer than the plight of the rangers that stand at the very heart of this problem.

Based on what the rangers told us, we built a panic button app that:
 - Allows you to set a specific group of phone numbers and email addresses to send emergency broadcsts to
 - Broadcasts your location to that while open via:
   - SMS (On open, then every time you move substantially and every 5 minutes)
   - A fallback technology - due to limitations in the WhatsApp and Email APIs available to us, we could not find a way to simply send a WhatsApp message or Email without having to open a client. Thus, we decided to allow the rangers and enforcement officials to set up a fallback technology, and when an emergency happens, _first_ broadcast the location of the ranger via SMS, _then_ open up the secondary app and allow them to send the (automatically created) message.
   - The currently available fallback technologies are:
     - WhatsApp (The rangers' communication tool of choice)
     - Email (A similar fallback mechanism that can be transmitted through either a data connection or WiFi)
