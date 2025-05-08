import z from "./schemas/index.js";

console.log("validating string array");
z.array(z.string()).parse(["hello", "world"]);

console.log("validating number array");
z.array(z.number()).parse(["hello", "world"]);
