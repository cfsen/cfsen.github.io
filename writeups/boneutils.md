<div class="markdown">
# BoneUtils

## What is it?
BoneUtils aims to be a portable base structure for 3D skeletons, providing a reusable abstraction layer for effecting transforms onto them. It currently includes a small demo built with RayLib bindings for C#, showcasing basic capabilities, and providing an example of real-world implementation. 

BoneUtils is still in early development as of writing this. This writeup assumes some familiarity with 3D concepts.

## Motivation & Goals
After working on my own Ktisis fork, I wanted to continue exploring how 3D skeletons can be implemented and mutated in code. The natural next step was to build a skeleton system from the ground up, focusing on expandability and portability to other projects in the future. 

My goal is to build a system that can be reused for future projects, such as games or animation tools.

## Key challenges

### 1. Building an expandable, testable, and portable base structure
While I started this project with a fairly solid idea of how a skeleton entity needs to behave, I want to remain mindful of expandability, testability and portability throughout the process. 

To achieve this, I will work towards a reasonable level of test coverage, ensure less intuitive segments of the codebase are well documented, and that the project is cleanly organized. I plan to make cleanup passes as major features are completed, ensuring that the project stays reasonably organized.

### 2. Performance
In order to make use of a skeleton in a real time system, performance is critical. While matrix and mathematical operations are fast, there are many potential performance pitfalls when working with a tree-like data structure. 

Performance optimization provides an opportunity to explore some of the functional programming features in C#, particularly the use of higher-order functions in performance-critical areas. This will increase complexity, but could in return offer both performance and flexibility. 

### 3. Implementing complex mutations: animations, IK, physics, etc.
As this is a field I have limited experience in, I consider these more advanced features a challenge for two main reasons: Firstly, because of my limited knowledge and experience in how these systems are implemented. Second, because of my experiences working with transforms in my Ktisis fork.  

While I won't shy away from implementing existing algorithms, part of the fun is attempting novel approaches to implement these systems.

## Technical overview
The skeleton is structured as a tree, composed of three primary components:
- Transform: Encapsulates the transformation data.
- BoneNode: Logic layer that wraps an individual Transform, handling propagation and update logic.
- SkeletonEntity: Ownership layer that manages its BoneNode objects, providing higher order features such as entity world position and local-to-world transforms.

This is supplemented by a helper class, which aids in constructing, validating and adding optional metadata — such as tree-depth for a SkeletonEntity's BoneNode hierarchy. This separation of concerns reduces both memory footprint and complexity for the SkeletonEntity class itself.

The design is structured so that it can easily be attached to a parent entity object, with engine-specific mesh data managed at either the BoneNode or Transform level.

This is still a work in progress, and this description may not accurately reflect the current state of the repository.

## Status report
The project is still in its early days, but the foundations feel solid. With the basic structure in place and a working demo up and running, I’m now looking to expand test coverage and build out more Raylib demos. Once that’s done, I’ll either focus on feature development or shift gears toward benchmarking to catch any hidden performance issues.

If you want to take a look, check out the [repo](https://github.com/cfsen/BoneUtils)!
</div>
