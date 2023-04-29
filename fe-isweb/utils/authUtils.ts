
function checkUserExists() : User | null {
    const otherVar = localStorage.getItem("user");
    console.log(otherVar);
    const someVar = (otherVar!==null?JSON.parse(otherVar):null)
    return someVar;
}

export const authUtils = { checkUserExists };