# Prototypes

## CSS Layout Prototypes ( for track / beat )

### Rough Sequence Track Cell ( css columns )
Goal: Figure out how to render the cells in CSS so I could hook this up to JS eventually
https://codepen.io/clintonhalpin/full/fac704a67710d7bddd099530d7b55777/

Notes
- Seems like flex box is the perfect usecase for this, a beat should just fill the space, it doesn't need a fixed width
- Set up the track icon so that it floats to the top on mobile, this seems ok, but might not be the best pattern


### Rough Sequence Track Cell (flexbox)
Goal: Can we use flexbox so we don't have to hard code widths https://codepen.io/clintonhalpin/full/OzOGdJ/

Notes
- Works pretty good but there are some layout issues
- Items can grow outside of container
- This works great on mobile, less on desktop!


## Javascript
### Play ( While Loop! )
Goal: Just stub out while loop that will run 16 times ( would be recursive while playing )
https://codepen.io/clintonhalpin/pen/8c927686952790f813cf4bf7776223c1/

Notes
- So I had a little idea here, so we are executing O(n) here, depending on load computations that need to happen, only if we have a change we could calculate all possible steps in array
- Another thing that might be cheaper would be just to calculate the next step, so 16 iterations could become 8 iterations and so on....

### Add Stop/Play Functionality 
Goal: Figure out how to do stop/start iterative on previous functionality
https://codepen.io/clintonhalpin/pen/ca9ca56777f0d026a695be6cc91eb224/


### CSS / Layout refinements
See All [here](https://www.dropbox.com/sh/l20woiy9vu2clza/AADXe_a0PraJbML5YsvJROk4a?dl=0)

Notes
- Still need to add the track indicators eg. "Kick" 
- Not 100% happy with cells on mobile but happy I got everything to be 100% fluid

![screen shot 2018-01-09 at 10 20 41 pm](https://user-images.githubusercontent.com/523933/34779478-52f6cfc8-f5ee-11e7-841e-2152a425cf97.png)
![screen shot 2018-01-09 at 10 20 37 pm](https://user-images.githubusercontent.com/523933/34779482-54e0138a-f5ee-11e7-8c93-890af12ef50e.png)