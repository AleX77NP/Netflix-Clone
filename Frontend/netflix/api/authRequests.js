const authRequests = {
    signup: 'users/signup',
    signin: 'users/login',
    signout: 'users/logout',
    confirmAccount: 'users/confirm/email',
    me: 'users/me',
    addLike: 'users/like/add',
    removeLike: 'users/like/remove',
    addDislike: 'users/dislike/add',
    removeDislike: 'users/dislike/remove',
    addProfile: 'users/profiles/add',
    removeProfile: 'users/profiles/remove',
    addWatchlist: 'users/watchlist/add',
    removeWatchlist: 'users/watchlist/remove'
}

export default authRequests;