const name = ["abhinav", "harshita"]
console.log(name[2])
const user = {
    name: "value",
    age: 20
}
//console.log(name);
//console.log("name");
// console.log(name);


const req = {
    header: {},
    body: {
        user_details: user
    },
    query: {}
}
console.log(req.header);
console.log(req.body);
console.log(req.query);