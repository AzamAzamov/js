// class Rectangle {
//     constructor(length,width) {
//         this.length = length
//         this.width = width
//     }
//     getWidht(){
//         return this.width;
//     }
//     getLength(){
//         return this.length;
//     }
// }
// const shapeOne = new Rectangle(2,4)



// console.log(shapeOne.getLength());
// console.log(shapeOne.getWidht());


// class Animals {
//     constructor(name,age) {
//         this.name = name;
//         this.age = age;
//     }
//     eat(){
//         console.log(`${this.name} eats.`);
//     }
// }
// class Dog extends Animals {
//     constructor(name,age,breed) {
//         super(name,age)
//         this.breed = breed
//     }
//     sound(){
//         console.log(`${this.name} makes a sound.`);
//     }
// }
// const dog = new Dog("Buddy",5,"Golden Retriever");

// dog.eat();
// dog.sound();


// class Shape {
//     calculateArea(){
//         return 0;
//     }
// }
// class Circle extends Shape {
//     constructor(radius) {
//         super();
//         this.radius = radius
//     }
//     calculateArea(){
//         return Math.PI * Math.pow(this.radius,2)
//     }
// }
// class Rectangle extends Shape{
//     constructor(width,height) {
//         super();
//         this.width = width;
//         this.height = height;
//     }
//     calculateArea(){
//         return this.width * this.height;
//     }
// }
// const circle = new Circle(7);
// const rectangle = new Rectangle(4,6);
// console.log(`Area of the circle: ${circle.calculateArea()}`);
// console.log(`Area of the circle: ${rectangle.calculateArea()}`);



// class Transport {
//     constructor(name,type) {
//         this.name = name;
//         this.type = type;
//     }
//     move(){
//         return `${this.name} is movcing`
//     }
// }
// class Car extends Transport {
//     constructor(name,fuelType) {
//         super(name,'Car');
//         this.fuelType = fuelType
//     }
//     drive(){
//         return `${this.name} is driving on ${this.fuelType} fuel.`
//     }
// }

// const muCar = new Car("My car","gasoline");
// console.log(muCar.move());
// console.log(muCar.drive());


class Todolist {
    constructor(API) {
        this.API = API;
        this.get();
        this.box = document.querySelector(".box")
        this.inpName = document.querySelector(".inpName")
        this.selectSt = document.querySelector(".selectSt")
        this.addForm = document.querySelector(".addForm")
        this.add = document.querySelector(".add")
        this.addModal = document.querySelector(".addModal")
        this.close = document.querySelector(".close")
        this.close.onclick = () => {
            this.addModal.close()
        }
        this.add.onclick = () => {
            this.addModal.showModal()
            this.addUser();
        }

    }
    async get() {
        try {
            let response = await fetch(this.API)
            let data = await response.json();
            console.log(data);
            this.getDate(data)
        } catch (error) {
            console.log(error);
        }
    }

    async delUser(id) {
        try {
            await fetch(`${this.API}/${id}`, {
                method: "DELETE"
            })
            this.get()

        } catch (error) {
            console.log(error);
        }
    }


    getDate(data) {
        this.box.innerHTML = ""
        data.forEach((e) => {
            let constructor = document.createElement("div")
            let h1 = document.createElement("h1")
            h1.innerHTML = e.name
            let status = document.createElement("h2")
            status.innerHTML = e.status

            let delbtn = document.createElement("button")
            delbtn.innerHTML = "DELETE"
            delbtn.onclick = () => {
                this.delUser(e.id)
            }
            constructor.append(h1, status, delbtn)
            this.box.append(constructor)
        })
    }
    addUser() {
        this.addForm.onsubmit = async (event) => {
            event.preventDefault()
            let newUser = {
                name: event.target["inpName"].value,
                status: event.target["selectSt"].value == "true" ? true : false,
                id: `${Date.now()}`
            };
            try {
                await fetch(this.API, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newUser)
                })
                this.get()
                this.addModal.close()
            } catch (error) {
                console.log(error);
            }
        }
    }
}

new Todolist("https://67d55164d2c7857431f0035c.mockapi.io/Users")