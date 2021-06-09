export  const resultsPaged = (arr,f,l) => {
    return  arr.slice(f,l)
}

export const arrayIncludes = (arr,item) => {
    return arr.some(elem => elem.id === item.id) ? true : false
}

export const arrayIncludesId = (arr,item) => {
    return arr.some(elem => elem === item) ? true : false
}