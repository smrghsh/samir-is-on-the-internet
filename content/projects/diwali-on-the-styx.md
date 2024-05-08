---
title: Diwali on the Styx
year: 2020
thumbnail: diwali.gif
display: true
---
As a drop of water travels down a stream, it swirls in eddies and vortices whose patterns constantly change. This complexity is a challenge to simulate-- as an aggregate mass, the liquid flows downstream, but a closer examination will show counter currents and changing turbulence. Closer still, individual molecules react to subtle forces as they push and pull their peers.

<!-- Inigo Quilez, progenitor of shader techniques, wrote the following about depicting nature with computer graphics:
>It is intuitively evident that shapes in nature can be decomposed in few big shapes that describe the overall form, and a larger number of medium size shapes that distort the basic contour or surface of the initial shape 

Quilez gives us the following technique, named Domain Warping, for creating surfaces with organic contours. `f(p)` represents a function that outputs an image, whose input is `p` a position on the screen. `fbm` is Fractional Brownian Motion, a of source of variation that is used often in the procedural generation of terrain and flora.

> f(p) = fbm( p + fbm( p + fbm( p )) )

Fractional Brownian Motion has an interesting property where incremental states relate to their previous states. Quilez explains this as possessing "some sort of memory." This anthropomorphism led me to name this piece after the mythological river "Styx" because it reminded me that our conscious percept of the flow of a river is highly dependent on our memory of the river's previous positions. The Styx is a river of the underworld that souls pass through as they leave their mortal consciousness behind.

The insight of this piece's algorithm is that each of the nested FBM functions represent tiers of motion in a river -- the smallest may be the subtlest undercurrent, and largest could depict the overall direction. In order to turn a usually static algorithm into a fluid animation, I devised a way to apply velocities independently for each of these tiers. The undercurrent pushes back against the flow, and we see this turbulence reflected in the surface.

The color palette comes from properties that represent this turbulence. I intended this piece to be mostly blue, like water, but when there is too much disparity other color palettes that are beyond my control are revealed. I made this piece during the season of Diwali, festival of lights; seeing occasional pockets of brilliance compete for space with darkness informed my choice of this piece's name.

Even though this piece is a depiction of a river, nested patterns of complexity exist everywhere. The universe is a cooperation of large a hierarchy of systems, from the smallest subatomic particles, to the orbits of celestial bodies. 

By contemplating algorithms that simulate reality, we gain computational insight into nature's form. -->