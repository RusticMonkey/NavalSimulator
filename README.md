# NavalSimulator

Initially develop a combat engine for ww1/2 naval vesells to simulate the results of firing at each other.
Factors for first version:
  - relative ship speed
  - relative ship directions
  - size of target
  - rate of fire
  - accuracy of weapon system
  - calibre of weapon system
  - target armour
  - range of weapon system
  - plunging fire vs direct fire


Future
- hit locations
- weather conditions
- intervening units / terrain
- target actively evading
- night
- radar controlled firing
- armour schemes and hit boxes
- indirect fire
- torpedoes
- smaller calibre weapon systems (<6")
- smaller vessels
- submarine combat
- aircraft combat
- high level bombing


# Model
Ships will have the following characteristics modelled
- Accelleration - calculated from engine power and displacement
- Turn rate - calculated similar to above
- Top speed - lifted directly from ship statistics
- Ship size - calculated from displacement
- Overall armour rating - some noddy calculation initially
- for each weapon system
-   Calibre in inches
-   Range
-   Ammo modifiers
