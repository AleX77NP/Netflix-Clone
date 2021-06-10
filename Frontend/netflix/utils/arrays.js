export  const resultsPaged = (arr,f,l) => {
    return  arr.slice(f,l)
}

export const arrayIncludes = (arr,item) => {
    return arr.some(elem => elem.id === item.id) ? true : false
}

export const arrayIncludesId = (arr,item) => {
    return arr.some(elem => elem === item) ? true : false
}

export const getSize = (arr) => {
    return arr ? arr.length : 0
}

export const getAvailPicture = (arr, arr2) => {
    let profiles = arr.map(profile => profile.image).filter(elem => elem !== "/images/profiles/kids.png" && elem !== "images/profiles/profile1.png")
    let avail = arr2.filter(item => !profiles.includes(item))
    return avail[0]
}