var Example = Example || {};

Example.restitution = function() {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Composite = Matter.Composite,
        Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 800,
            height: 600,
            showAngleIndicator: true,
            showCollisions: true,
            showVelocity: true,
						devicePixelRatio: 100
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

		console.log(render)

    // add bodies
    var rest = 0.9, 
        space = 600 / 5;
    
    Composite.add(world, [
        Bodies.rectangle(100 + space * 0, 500, 50, 50, { restitution: 1, friction: 0, frictionStatic: 0, frictionAir: 0, inertia: Infinity }),
        Bodies.rectangle(100 + space * 1.5, 300, 50, 50, { restitution: 1, friction: 0, frictionStatic: 0, frictionAir: 0, inertia: Infinity }),
        Bodies.rectangle(100 + space * 3, 100, 50, 50, { restitution: 1, friction: 0, frictionStatic: 0, frictionAir: 0, inertia: Infinity }),
        // walls
        Bodies.rectangle(400, 0, 800, 50, { isStatic: true, restitution: 1 }),
        Bodies.rectangle(400, 600, 800, 50, { isStatic: true, restitution: 1 }),
        Bodies.rectangle(800, 300, 50, 600, { isStatic: true, restitution: 1 }),
        Bodies.rectangle(0, 300, 50, 600, { isStatic: true, restitution: 1 })
    ]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });

    // context for MatterTools.Demo
    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function() {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
};

Example.restitution.title = 'Restitution';
Example.restitution.for = '>=0.14.2';

if (typeof module !== 'undefined') {
    module.exports = Example.restitution;
}
