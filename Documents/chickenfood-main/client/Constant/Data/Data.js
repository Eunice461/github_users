import assets from "../Assets/assets";
const FoodData = [
    {
        id: 1,
        food: 'ChickenLap',
        description: 'Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        image: "https://res.cloudinary.com/blognodeapi/image/upload/v1670174078/chickeneat/pexels-%E7%B4%A0%E6%9D%90%E7%8E%8B%E5%9B%BD-footage-kingdom-13823476_ki08p4.jpg",
        price: 1200
    },
    {
        id: 2,
        food: 'Full chicken',
        description: 'Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        image: 'https://res.cloudinary.com/blognodeapi/image/upload/v1670173872/chickeneat/pexels-tim-douglas-6210876_obggbn.jpg',
        price: 5000
    },

    {
        id: 3,
        food: 'Chicken Wings',
        description: 'Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        image: 'https://res.cloudinary.com/blognodeapi/image/upload/v1670174103/chickeneat/pexels-denys-gromov-12916881_rmzyau.jpg',
        price: 2500
    },


    {
        id: 4,
        food: 'Smart Noodles',
        description: 'Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        image: 'https://res.cloudinary.com/blognodeapi/image/upload/v1670174199/chickeneat/Indomie-Instant-Noodles-MYRECIPE-BRAND-SPUR-1200x900_ztbjvg.jpg',
        price: 3000
    },
    
    {
        id: 5,
        food: 'Smart Noodles2',
        description: 'Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        image: 'https://res.cloudinary.com/blognodeapi/image/upload/v1670174929/chickeneat/pexels-horizon-content-3727197_ycj8ci.jpg',
        price: 3500
    },

    {
        id: 6,
        food: 'Smart Noodles3',
        description: 'Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        image: 'https://res.cloudinary.com/blognodeapi/image/upload/v1670175383/chickeneat/pexels-lukas-1309593_pydyhi.jpg',
        price: 2700
    },


    {
        id: 7,
        food: 'Full package',
        description: 'Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        image: 'https://res.cloudinary.com/blognodeapi/image/upload/v1670177455/chickeneat/noodles_xabbge.png',
        price: 2700
    },

    {
        id: 8,
        food: 'Fries',
        description: 'Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        image: 'https://res.cloudinary.com/blognodeapi/image/upload/v1670177577/chickeneat/pexels-valeria-boltneva-1893555_tur3xh.jpg',
        price: 1800
    },
]





const sectionData = [
    {
        title: 'Hot Deals',
        data:[[
            {
                id: 1,
                food: 'ChickenLap',
                description: 'Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
                image: "https://res.cloudinary.com/blognodeapi/image/upload/v1670174078/chickeneat/pexels-%E7%B4%A0%E6%9D%90%E7%8E%8B%E5%9B%BD-footage-kingdom-13823476_ki08p4.jpg",
                price: 1200
            },
            {
                id: 2,
                food: 'Full chicken',
                description: 'Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
                image: 'https://res.cloudinary.com/blognodeapi/image/upload/v1670173872/chickeneat/pexels-tim-douglas-6210876_obggbn.jpg',
                price: 5000
            },
        
            {
                id: 3,
                food: 'Chicken Wings',
                description: 'Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
                image: 'https://res.cloudinary.com/blognodeapi/image/upload/v1670174103/chickeneat/pexels-denys-gromov-12916881_rmzyau.jpg',
                price: 2500
            },
        
        
            {
                id: 4,
                food: 'Smart Noodles',
                description: 'Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
                image: 'https://res.cloudinary.com/blognodeapi/image/upload/v1670174199/chickeneat/Indomie-Instant-Noodles-MYRECIPE-BRAND-SPUR-1200x900_ztbjvg.jpg',
                price: 3000
            },
            
            {
                id: 5,
                food: 'Smart Noodles2',
                description: 'Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
                image: 'https://res.cloudinary.com/blognodeapi/image/upload/v1670174929/chickeneat/pexels-horizon-content-3727197_ycj8ci.jpg',
                price: 3500
            },
        
           
        ]]
    },

    
   
]

const recent =[
   
    {
        id: 6,
        food: 'Smart Noodles3',
        description: 'Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        image: 'https://res.cloudinary.com/blognodeapi/image/upload/v1670175383/chickeneat/pexels-lukas-1309593_pydyhi.jpg',
        price: 2700
    },


    {
        id: 7,
        food: 'Full package',
        description: 'Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        image: 'https://res.cloudinary.com/blognodeapi/image/upload/v1670177455/chickeneat/noodles_xabbge.png',
        price: 2700
    },

    {
        id: 8,
        food: 'Fries',
        description: 'Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        image: 'https://res.cloudinary.com/blognodeapi/image/upload/v1670177577/chickeneat/pexels-valeria-boltneva-1893555_tur3xh.jpg',
        price: 1800
    },
]

const Nofitication = [
    {
        id:1,
        name: "Your orders have been picked up",
        date: "Now"
    },
    {
        id:2,
        name: "Your orders have been delivered",
        date: "1h ago"
    },
    {
        id:3,
        name: "Your orders have been picked up lorem",
        date: "3h ago"
    },
     {
        id:4,
        name: "Your orders have been picked up lorem",
        date: "5h ago"
    },
    {
        id:5,
        name: "Your orders have been picked up lorem",
        date: "05 Sep 2020"
    },
    {
        id:6,
        name: "Your orders have been picked up lorem",
        date: "12 Aug 2020"
    },
    {
        id:7,
        name: "Your orders have been picked up lorem",
        date: "20 Jul 2020"
    },
    {
        id:8,
        name: "Your orders have been picked up lorem",
        date: "12 Jul 2020"
    },
]

const OrderItem = [
    {
            id: 6,
            subTotal: 70,
            DeliveryCost: 10,
            total: 80,
            address: "N0 03, 4th Lane Newyork",
            id: 9,
            desc: "Buger Western Food",
            mainName: "King Burgers",
            rating: 4.5,
            orderlist: [
    {
        id:1,
        name: "Beef Burger x1",
        price: 16
    },
    {
        id:2,
        name: "Beef Burger x1",
        price: 16
    },
    {
        id:3,
        name: "Beef Burger x1",
        price: 16
    },
    {
        id:4,
        name: "Beef Burger x1",
        price: 16
    },
    {
        id:5,
        name: "Beef Burger x1",
        price: 16
    },
]
},
      
]

const msg = [
    {
        id: 1,
        text: "hello",
        image: "https://images.pexels.com/photos/4157177/pexels-photo-4157177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        createdAt: "Now"
    },
    {
        id: 2,
        text: "hello",
        image: "https://images.pexels.com/photos/4157177/pexels-photo-4157177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        createdAt: "17 may 2023"
    },
    {
        id: 3,
        text: "hello",
        image: "https://images.pexels.com/photos/4157177/pexels-photo-4157177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        createdAt: "15 july 2020"
    },
    {
        id: 4,
        text: "hello",
        image: "https://images.pexels.com/photos/4157177/pexels-photo-4157177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        createdAt: "5 min ago"
    },
    {
        id: 5,
        text: "hello",
        image: "https://images.pexels.com/photos/4157177/pexels-photo-4157177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        createdAt: "1 hour ago"
    },
    {
        id: 6,
        text: "hello",
        image: "https://images.pexels.com/photos/4157177/pexels-photo-4157177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        createdAt: "Now"
    }
]

export { FoodData,  sectionData, recent, Nofitication, OrderItem };