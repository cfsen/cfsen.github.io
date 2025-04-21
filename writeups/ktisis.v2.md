<div class="markdown">
# Ktisis (fork)

## What is it?
Ktisis ([upstream repo](https://github.com/ktisis-tools/Ktisis)) is a character posing tool for Final Fantasy XIV's screenshot mode, developed by Chirp. It enables users to express their creativity through digital photography, and to capture memorable moments with a degree of freedom not provided by the base game.

## Motivation & Goals
My work on Ktisis was initially motivated by wanting a few minor UI/UX tweaks for personal use. As I spent time with the codebase, I began to see opportunities to add more complex features. Seeing as it had been a couple of years since I last worked with C# on any larger project, I seized the chance to both improve a tool I enjoy using, and refresh my C#-knowledge.

## Key challenges

### 1. The complexity of Ktisis
Ktisis utilizes a vast array of OOP and C#-specific practices. Service composition, polymorphism, inheritance, service factories: the list goes on, ultimately leveraging pointers to manipulate game memory. With all its moving bits, I'd qualify it as being a complex project.

Onboarding onto a codebase like this, especially when documentation is non-existent and debugging has to happen in realtime while hooked into game memory, was every bit the challenge I predicted it to be. 

### 2. Unfamiliarity with Dalamud and games programming
[Dalamud](https://github.com/goatcorp/Dalamud) and [ClientStructs](https://github.com/aers/FFXIVClientStructs) are the underlying frameworks that Ktisis operates in. While Ktisis does a fair amount of memory hooking on its own, it also leverages the former frameworks. 

Seeing as I had no experience with either, beyond having glanced the docs, I wasn't entirely sure what I was getting myself into. But after that one time I managed to stitch Python together with Bluez via dbus to implement Bluetooth LE services, unfamiliar codebases don't faze me.

### 3. Bridging the gap between mathematical theory and programming
Going into this, I knew that games and 3D programming heavily lean on matrices and transformations to function. That was about the extent of my knowledge. While I knew my engineering background offered me solid mathematical ground to stand on, I also knew I would need to learn how these concepts operate in computer memory.

This would end up taking me on a journey that refreshed my linear algebra basics, trigonometry, and even learning about quaternions. And a lot of head-scratching.

## Technical overview
My additions to Ktisis are largely kept independent from the upstream codebase. This was an intentional decision, as Ktisis is regularly updated to function with the current version of the game. Additionally, I wanted to enable rapid iteration, without needing to delve into the deeper structure of Ktisis.

As I found the floating window UI to be limiting in rapid iteration, I opted to replace it with a docked sidebar for containing widgets. This would allow me to split up the current UI, as well as expand it with new features, without needing to spend much time tweaking ImGui draw calls. While I have plans to add contextual filtering for which widgets are displayed, simple filtering works well enough for the time being.

To briefly cover the limited integration approach, I do this by appending my own class into Ktisis's global context. From my base class, I initialize subclasses as you would with any other DI-approach. This allows for rapid iteration, as well as conveniently enabling me to inject the Dalamud plugin-service to my own classes.

To briefly highlight some features I added, I've ordered the following list in terms of impact it has had on working with the tool for me personally.

### Overview of features
1. **Scene saving and loading:** Saves actors and poses as serialized objects to JSON, including customization options offered by [Penumbra](https://github.com/xivdev/Penumbra) and [Glamourer](https://github.com/Ottermandias/Glamourer).
2. **Expanded camera controls:** Added a joystick-like widget to enable intuitive camera traversal across the scene, emulating a fluid tracking shot. 
3. **Gaze-to-camera/point:** Orients an actor's eyes to the camera, or a defined point.
4. **Expression LERP:** Enables blending between two saved actor expressions, with granular sliders for major expressive features such as the brows and mouth.
5. **Scene lighting:** Saving and loading spawned lights, expanded UI to include common color presets that emulate various real-world sources.
6. **Minor UX tweaks:** Quick access to bone overlay toggles, rapid switching between saved poses, and other small workflow-focused tweaks.
7. **Minor bug fixes:** Resolved small issues related to pose loading and IPC handling.

## Reflection
Working on this personal fork has been a fun and meaningful experience, and I'm generally pleased with both the process and product. While I intend to continue working on it to improve UX and refactor some code, I felt that with the bulk of the work done, now is a good time to reflect on it. 

Final Fantasy XIV's 7.2 update took place two weeks prior to writing this, and I'm happy to report that merging upstream changes was completed with a simple rebase. This was exactly what I was hoping to achieve: minimizing the work required to keep up to date with upstream. As I move on from this project, it's good to know that keeping it functional will (hopefully) not be too labor-intensive.

Transforming matrices and orienting quaternions were one of my favorite parts of the project. There's something incredibly cool and satisfying about the first time a transformation implementation runs correctly. In fact, I have another project in the works, where I'll be building a 3D skeleton data-structure and implementing IK from scratch.

With this project mostly behind me, I have a better understanding of the ecosystem of plugins for Final Fantasy XIV, as well as a deeper appreciation for all the hard work that has been put in by the community. Working on Ktisis has also served well as a tour of modern C#, and all the features and possibilities packed into the language. For my next project in C#, I look forward to experimenting more with the functional programming features. 

Finally, I'd like to express my thanks both to Chirp, and the countless contributors to Dalamud and ClientStructs. Without their work on their respective projects, none of this would have been possible. I've had a lot of fun working on this, and it has inspired me to develop my own plugin for Dalamud, hopefully at some point in the near future.

If you're interested in implementation details, check out the [repository](https://github.com/cfsen/Ktisis/tree/v0.3/lazy/lazy-imgui-7.2).
</div>
