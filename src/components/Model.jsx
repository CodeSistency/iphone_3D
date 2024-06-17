import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { OrbitControls, useGLTF, useScroll } from '@react-three/drei'
import gsap from 'gsap'
import { useFrame, useThree } from '@react-three/fiber'

export function Model(props) {
  const { nodes, materials } = useGLTF('./models/iphone_15_pro_max.glb')

  const scrollControl = useScroll()
  const timeline = useRef();



  //general ref
  const generalGroupRef = useRef();

  //camara
  const camera = useThree(state => state.camera)

  //controls ref
  const controls = useRef()

  //refs
  const appleLogoRef = useRef()
  const camaraRightRef = useRef()
  const camaraDownRef = useRef()
  const camaraUpRef = useRef()
  const camaraDetail = useRef()
  const phoneBorder = useRef()
  
  // Html div references
  const page_1_ref = useRef();
  const page_2_ref = useRef();
  const page_3_ref = useRef();
  const page_4_ref = useRef();
  const page_5_ref = useRef();
  const page_6_ref = useRef();

  useLayoutEffect(() => {
    page_1_ref.current = document.getElementById("page-1");
    page_2_ref.current = document.getElementById("page-2");
    page_3_ref.current = document.getElementById("page-3");
    page_4_ref.current = document.getElementById("page-4");
    page_5_ref.current = document.getElementById("page-5");
    page_6_ref.current = document.getElementById("page-6");
  }, []);
  

  useLayoutEffect(() => {

    timeline.current = gsap.timeline();

    let AnimationsData = []

   

    const appleLogoAnimations = [

      // esto todavia no existe seguir viendo el video para ver como se hace todo
      // {
      //   // Html div
      //   // Restore previous animations
      //   objectToAnimate: page_1_ref.current,
      //   properties: {
      //     opacity: 0,
      //     duration: 0.3,
      //   },
      //   timelinePoint: 0.5,
      // },
      // // html div
      // {
      //   objectToAnimate: page_2_ref.current,
      //   properties: {
      //     opacity: 1,
      //     duration: 0.8,
      //   },
      //   timelinePoint: 1.3,
      // },
      // Controls, Camera, Camera zoom
      {
        objectToAnimate: controls.current.target,
        properties: {
          y: 1,
          x: 0,
          z: 0,
        },
        timelinePoint: 0.1,
      },
      {
        objectToAnimate: camera.position,
        properties: {
          x: 0,
          y: 2,
          z: 8.3,
          duration: 1.3,
        },
        timelinePoint: 0.3,
      },
      {
        objectToAnimate: camera,
        properties: {
          zoom: 2.5,
          duration: 0.8,
          onUpdate: () => {
            camera.updateProjectionMatrix();
          },
        },
        timelinePoint: 0.6,
      },
      // {
      //   objectToAnimate: appleLogoRef.current.scale,
      //   properties: { x: 1.5, y: 1.5, z: 1.5, duration: 0.5, ease: "power1.inOut" },
      //   timelinePoint: 0.8,
      // },
      {
        objectToAnimate: appleLogoRef.current.material.color,
        properties: { r: 1, g: 0, b: 0, duration: 0.5, ease: "power1.inOut" },
        timelinePoint: 0.8,
      },
    ];

    const phoneBorderAnimations = [

      //Zoomining out
      {
        objectToAnimate: camera,
        properties: {
          zoom: 1.5,
          duration: 0.5,
          onUpdate: () => {
            camera.updateProjectionMatrix();
          },
        },
        timelinePoint: 1,
      },
         // Rotating the general group to show the phone border
         {
          objectToAnimate: generalGroupRef.current.rotation,
          properties: { y: Math.PI / 2, duration: 1, ease: "power2.inOut" },
          timelinePoint: 1.1,
        },
      // Scaling the phone border
      {
        objectToAnimate: phoneBorder.current.scale,
        properties: { x: 1.2, y: 1.2, z: 1.2, duration: 0.5, ease: "power1.inOut" },
        timelinePoint: 1.6,
      },
      // // Moving the camera around the phone
      // {
      //   objectToAnimate: camera.position,
      //   properties: { x: 5, y: 3, z: 5, duration: 1, ease: "power2.inOut" },
      //   timelinePoint: 1.1,
      // },
      {
        objectToAnimate: controls.current.target,
        properties: { x: 0, y: 1.5, z: 0, duration: 1, ease: "power2.inOut" },
        timelinePoint: 1.9,
      },
      // Rotating the general group to complete the cinematic effect
      {
        objectToAnimate: generalGroupRef.current.rotation,
        properties: { y: Math.PI, duration: 1, ease: "power2.inOut" },
        timelinePoint: 2.4,
      },
      {
        objectToAnimate: camera.position,
        properties: { x: -5, y: 3, z: 5, duration: 1, ease: "power2.inOut" },
        timelinePoint: 2.7,
      },
      {
        objectToAnimate: controls.current.target,
        properties: { x: 0, y: 1.5, z: 0, duration: 1, ease: "power2.inOut" },
        timelinePoint: 2.7,
      },
    ];
  
    const cameraAnimations = [
      // Return to initial position
      {
        objectToAnimate: camera.position,
        properties: { x: -4, y: 4, z: 8.3, duration: 1, ease: "power2.inOut" },
        timelinePoint: 3.0,
      },
      {
        objectToAnimate: controls.current.target,
        properties: { x: 0, y: 1, z: 0, duration: 1, ease: "power2.inOut" },
        timelinePoint: 3.0,
      },
      {
        objectToAnimate: generalGroupRef.current.rotation,
        properties: { y: Math.PI / 3, duration: 1, ease: "power2.inOut" },
        timelinePoint: 3.0,
      },

       // Scaling down the phone border
       {
        objectToAnimate: phoneBorder.current.scale,
        properties: { x: 1, y: 1, z: 1, duration: 0.5, ease: "power1.inOut" },
        timelinePoint: 3.5,
      },

      {
        objectToAnimate: camera,
        properties: {
          zoom: 4,
          duration: 0.5,
          onUpdate: () => {
            camera.updateProjectionMatrix();
          },
        },
        timelinePoint: 4,
      },
      // Position in front of the phone camera
      // {
      //   objectToAnimate: camera.position,
      //   properties: { x: 0, y: 2, z: 5, duration: 1, ease: "power2.inOut" },
      //   timelinePoint: 3.5,
      // },
      // {
      //   objectToAnimate: controls.current.target,
      //   properties: { x: 0, y: 1.5, z: 0, duration: 1, ease: "power2.inOut" },
      //   timelinePoint: 3.5,
      // },
      // // Zoom in on the phone camera
      // {
      //   objectToAnimate: camera,
      //   properties: {
      //     zoom: 2.7,
      //     duration: 0.8,
      //     onUpdate: () => {
      //       camera.updateProjectionMatrix();
      //     },
      //   },
      //   timelinePoint: 3.6,
      // },
      // {
      //   objectToAnimate: camera.position,
      //   properties: { x: 0, y: 2, z: 1, duration: 0.8, ease: "power2.inOut" },
      //   timelinePoint: 4.4,
      // },
    ];
   const camaraDetailsAnimations = [
    {
      objectToAnimate: camera.position,
      properties: { x: -12, y:6, z:-2, duration: 1, ease: "power2.inOut" },
      timelinePoint: 4.5,
    },
    // {
    //   objectToAnimate: controls.current.target,
    //   properties: { x: 0, y: 0.5, z: 0, duration: 1, ease: "power2.inOut" },
    //   timelinePoint: 4.5,
    // },

        {
      objectToAnimate: camaraRightRef.current.position,
      properties: { x: -5, duration: 0.5, ease: "power2.inOut" },
      timelinePoint: 5,
    },
    {
      objectToAnimate: camaraDownRef.current.position,
      properties: {  x: -3, duration: 0.5, ease: "power2.inOut" },
      timelinePoint: 5.2,
    },
    {
      objectToAnimate: camaraUpRef.current.position,
      properties: {  x: -4, duration: 0.5, ease: "power2.inOut" },
      timelinePoint: 5.4,
    },
    {
      objectToAnimate: camaraDetail.current.position,
      properties: {  x: -0.5, duration: 0.5, ease: "power2.inOut" },
      timelinePoint: 5.5,
    },
    

    // Add rotation for cinematic effect
    // {
    //   objectToAnimate: camaraRightRef.current.rotation,
    //   properties: { x: Math.PI / 2, duration: 0.5, ease: "power2.inOut" },
    //   timelinePoint: 5.3,
    // },
    // {
    //   objectToAnimate: camaraDownRef.current.rotation,
    //   properties: { x: Math.PI / 2, duration: 0.5, ease: "power2.inOut" },
    //   timelinePoint: 5.8,
    // },
    // {
    //   objectToAnimate: camaraUpRef.current.rotation,
    //   properties: { x: Math.PI / 2, duration: 0.5, ease: "power2.inOut" },
    //   timelinePoint: 6.3,
    // },
    // {
    //   objectToAnimate: camaraDetail.current.rotation,
    //   properties: { x: Math.PI / 2, duration: 0.5, ease: "power2.inOut" },
    //   timelinePoint: 6.8,
    // },
  ];

  const finalAnimation = [
    {
      objectToAnimate: camaraRightRef.current.position,
      properties: { x: -1.5, duration: 0.5, ease: "power2.inOut" },
      timelinePoint: 5.7,
    },
    {
      objectToAnimate: camaraDownRef.current.position,
      properties: {  x: -1.5, duration: 0.5, ease: "power2.inOut" },
      timelinePoint: 5.9,
    },
    {
      objectToAnimate: camaraUpRef.current.position,
      properties: {  x: -1.5, duration: 0.5, ease: "power2.inOut" },
      timelinePoint: 6.2,
    },
    {
      objectToAnimate: camaraDetail.current.position,
      properties: {  x: -0.10, duration: 0.5, ease: "power2.inOut" },
      timelinePoint: 6.2,
    },

      // Return to initial position
      {
        objectToAnimate: camera.position,
        properties: { x: -4, y: 4, z: 8.3, duration: 0.5, ease: "power2.inOut" },
        timelinePoint: 6.5,
      },
      {
        objectToAnimate: controls.current.target,
        properties: { x: 0, y: 1, z: 0, duration: 0.5, ease: "power2.inOut" },
        timelinePoint: 6.5,
      },
      {
        objectToAnimate: generalGroupRef.current.rotation,
        properties: { y: Math.PI / 3, duration: 0.5, ease: "power2.inOut" },
        timelinePoint: 6.5,
      },

      {
        objectToAnimate: camera,
        properties: {
          zoom: 2,
          duration: 0.5,
          onUpdate: () => {
            camera.updateProjectionMatrix();
          },
        },
        timelinePoint: 6.8,
      },
  ]

  const htmlAnimation = [
    {
      // Html div
      // Restore previous animations
      objectToAnimate: page_1_ref.current,
      properties: {
        opacity: 0,
        duration: 0.3,
      },
      timelinePoint: 0.5,
    },
    // html div
    {
      objectToAnimate: page_2_ref.current,
      properties: {
        opacity: 1,
        duration: 0.8,
      },
      timelinePoint: 0.9,
    },

    {
      objectToAnimate: page_2_ref.current,
      properties: {
        opacity: 0,
        duration: 0.3,
      },
      timelinePoint: 1.4,
    },

    //html div
    {
      objectToAnimate: page_3_ref.current,
      properties: {
        opacity: 1,
        duration: 0.3,
      },
      timelinePoint: 1.9,
    },

         // Restore previous animations
         {
          objectToAnimate: page_3_ref.current,
          properties: {
            opacity: 0,
            duration: 0.3,
          },
          timelinePoint: 3.7,
        },
  
        //html div
        {
          objectToAnimate: page_4_ref.current,
          properties: {
            opacity: 1,
            duration: 0.3,
          },
          timelinePoint: 3.9,
        },

        {
          objectToAnimate: page_4_ref.current,
          properties: {
            opacity: 0,
            duration: 0.3,
          },
          timelinePoint: 4.3,
        },
        // Html div
        {
          objectToAnimate: page_5_ref.current,
          properties: {
            opacity: 1,
            duration: 0.8,
          },
          timelinePoint: 4.6,
        },

        {
          objectToAnimate: page_5_ref.current,
          properties: {
            opacity: 0,
            duration: 0.3,
          },
          timelinePoint: 5.8,
        },
        {
          objectToAnimate: page_6_ref.current,
          properties: {
            opacity: 1,
            duration: 0.8,
          },
          timelinePoint: 6.2,
        },
  ]

  AnimationsData = [
    ...AnimationsData,
    ...appleLogoAnimations,
    ...phoneBorderAnimations,
    ...cameraAnimations,
    ...finalAnimation,
    ...htmlAnimation,
    ...camaraDetailsAnimations,
  ];


      AnimationsData.map((animation) => {
        timeline.current.to(
            animation.objectToAnimate,
            {
                ...animation.properties
            },
            animation.timelinePoint
        )
      })


  

  }, [])

  useFrame(() =>{
    timeline.current.seek(
        scrollControl.offset * timeline.current.duration()
    );
  })

  const [wireframeParts, setWireframeParts] = useState({});


  const highlightPart = (name) => {
    const part = generalGroupRef.current.getObjectByName(name);
    if (part) {
      console.log(name);
      // Example: Increase the scale of the highlighted part
      // part.scale.set(1.2, 1.2, 1.2);
    }
  };

  const toggleWireframe = (name) => {
    setWireframeParts((prev) => {
      const newWireframeParts = { ...prev, [name]: !prev[name] };
      return newWireframeParts;
    });
  };

  // Effect to apply wireframe mode based on state
  useEffect(() => {
    Object.keys(wireframeParts).forEach((name) => {
      const part = generalGroupRef.current.getObjectByName(name);
      if (part) {
        part.traverse((child) => {
          if (child.isMesh) {
            child.material.wireframe = wireframeParts[name];
          }
        });
      }
    });
  }, [wireframeParts]);

  // useEffect(() => {
  //   toggleWireframe("Object_4")
  //   // setWireframeParts("Object_4")
  // }, [])

  return (
    <>
      <OrbitControls enableZoom={false} ref={controls} />
      <group ref={generalGroupRef} {...props} dispose={null}>
        <group
          name="Cube_10"
          position={[0, 1.8274, -0.5461]}
          scale={[0.0999, 1.6544, 0.7952]}
          onClick={() => highlightPart("Cube_10")}
        >
          <mesh
            name="Object_4"
            castShadow
            receiveShadow
            geometry={nodes.Object_4.geometry}
            material={materials['Material.001']}
            onClick={() => highlightPart("Object_4")}
          />
          <mesh
          ref={phoneBorder}
            name="Object_5"
            castShadow
            receiveShadow
            geometry={nodes.Object_5.geometry}
            material={materials['Material.002']}
            onClick={() => highlightPart("Object_5")}
          />
          <mesh
            name="Object_6"
            castShadow
            receiveShadow
            geometry={nodes.Object_6.geometry}
            material={materials['Material.006']}
            onClick={() => highlightPart("Object_6")}
          />
          <mesh
            name="Object_7"
            castShadow
            receiveShadow
            geometry={nodes.Object_7.geometry}
            material={materials['Material.007']}
            onClick={() => highlightPart("Object_7")}
          />
          <mesh
            name="Object_8"
            castShadow
            receiveShadow
            geometry={nodes.Object_8.geometry}
            material={materials['Material.012']}
            onClick={() => highlightPart("Object_8")}
          />
          <group
            ref={camaraDownRef}
            name="Cylinder001_2"
            position={[-1.4936, 0.5721, -0.6219]}
            rotation={[-Math.PI, 0, -Math.PI / 2]}
            scale={[0.107, 0.1471, 0.2227]}
            onClick={() => highlightPart("Cylinder001_2")}
          >
            <mesh
              name="Object_14"
              castShadow
              receiveShadow
              geometry={nodes.Object_14.geometry}
              material={materials['Material.010']}
              onClick={() => highlightPart("Object_14")}
            />
            <mesh
              name="Object_15"
              castShadow
              receiveShadow
              geometry={nodes.Object_15.geometry}
              material={materials['Material.019']}
              onClick={() => highlightPart("Object_15")}
            />
          </group>
          <group
            ref={camaraUpRef}
            name="Cylinder002_3"
            position={[-1.4936, 0.8155, -0.6219]}
            rotation={[-Math.PI, 0, -Math.PI / 2]}
            scale={[0.107, 0.1471, 0.2227]}
            onClick={() => highlightPart("Cylinder002_3")}
          >
            <mesh
              name="Object_17"
              castShadow
              receiveShadow
              geometry={nodes.Object_17.geometry}
              material={materials['Material.010']}
              onClick={() => highlightPart("Object_17")}
            />
            <mesh
              name="Object_18"
              castShadow
              receiveShadow
              geometry={nodes.Object_18.geometry}
              material={materials['Material.019']}
              onClick={() => highlightPart("Object_18")}
            />
          </group>
          <group
            ref={camaraRightRef}
            name="Cylinder010_6"
            position={[-1.4936, 0.6873, -0.0984]}
            rotation={[-Math.PI, 0, -Math.PI / 2]}
            scale={[0.107, 0.1471, 0.2227]}
            onClick={() => highlightPart("Cylinder010_6")}
          >
            <mesh
              name="Object_24"
              castShadow
              receiveShadow
              geometry={nodes.Object_24.geometry}
              material={materials['Material.010']}
              onClick={() => highlightPart("Object_24")}
            />
            <mesh
              name="Object_25"
              castShadow
              receiveShadow
              geometry={nodes.Object_25.geometry}
              material={materials['Material.019']}
              onClick={() => highlightPart("Object_25")}
            />
          </group>
          <mesh
            name="Object_10"
            castShadow
            receiveShadow
            geometry={nodes.Object_10.geometry}
            material={materials['Material.003']}
            position={[0, 0.233, -1.0058]}
            rotation={[-Math.PI, 0, 0]}
            scale={[-0.3257, 0.1164, 0.0211]}
            onClick={() => highlightPart("Object_10")}
          />
          <mesh
            name="Object_12"
            castShadow
            receiveShadow
            geometry={nodes.Object_12.geometry}
            material={materials['Material.004']}
            position={[-1.2222, 0.6902, -0.3645]}
            rotation={[-Math.PI, 0, 0]}
            scale={[-0.1944, 0.2691, 0.5534]}
            onClick={() => highlightPart("Object_12")}
          />
          <mesh
            name="Object_20"
            castShadow
            receiveShadow
            geometry={nodes.Object_20.geometry}
            material={materials['Material.009']}
            position={[-1.3598, 0.4968, -0.0915]}
            rotation={[-Math.PI, 0, -1.373]}
            scale={[0.0454, 0.0306, 0.0882]}
            onClick={() => highlightPart("Object_20")}
          />
          <mesh
            name="Object_22"
            castShadow
            receiveShadow
            geometry={nodes.Object_22.geometry}
            material={materials.material_0}
            position={[-1.3256, 0.8266, 0.0803]}
            rotation={[-Math.PI, 0, -Math.PI / 2]}
            scale={[0.0066, 0.0048, 0.0138]}
            onClick={() => highlightPart("Object_22")}
          />
          <mesh
            name="Object_27"
            castShadow
            receiveShadow
            geometry={nodes.Object_27.geometry}
            material={materials['Material.018']}
            position={[-1.1648, 0.683, -0.0952]}
            rotation={[-Math.PI, 0, 0]}
            scale={[0.3297, 0.0376, 0.0782]}
            onClick={() => highlightPart("Object_27")}
          />
          <mesh
            name="Object_29"
            castShadow
            receiveShadow
            geometry={nodes.Object_29.geometry}
            material={materials['Material.018']}
            position={[-1.1648, 0.5703, -0.6199]}
            rotation={[-Math.PI, 0, 0]}
            scale={[0.2834, 0.0323, 0.0672]}
            onClick={() => highlightPart("Object_29")}
          />
          <mesh
            name="Object_31"
            castShadow
            receiveShadow
            geometry={nodes.Object_31.geometry}
            material={materials['Material.018']}
            position={[-1.1648, 0.816, -0.6199]}
            rotation={[-Math.PI, 0, 0]}
            scale={[0.2834, 0.0323, 0.0672]}
            onClick={() => highlightPart("Object_31")}
          />
        </group>
        <group
          ref={camaraDetail}
          name="Cylinder_15"
          position={[-0.0889, 3.2666, -0.6245]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={0.0665}
          onClick={() => highlightPart("Cylinder_15")}
        >
          <mesh
            name="Object_35"
            castShadow
            receiveShadow
            geometry={nodes.Object_35.geometry}
            material={materials['Material.008']}
            onClick={() => highlightPart("Object_35")}
          />
          <mesh
            name="Object_36"
            castShadow
            receiveShadow
            geometry={nodes.Object_36.geometry}
            material={materials['Material.011']}
            onClick={() => highlightPart("Object_36")}
          />
          <mesh
            name="Object_37"
            castShadow
            receiveShadow
            geometry={nodes.Object_37.geometry}
            material={materials['Material.013']}
            onClick={() => highlightPart("Object_37")}
          />
        </group>
        <mesh
          ref={appleLogoRef}
          name="Object_33"
          castShadow
          receiveShadow
          geometry={nodes.Object_33.geometry}
          material={materials['logo_brand_brands_logos_apple_ios-512']}
          position={[-0.1687, 1.8577, -0.5505]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          scale={0.4882}
          onClick={() => highlightPart("Object_33")}
        />
      </group>
    </>
  )
}

useGLTF.preload('./models/iphone_15_pro_max.glb')