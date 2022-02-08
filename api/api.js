export const getCommentsBook = async id => {
    try {
        const response = await fetch(`http://sound-aileron-337523.rj.r.appspot.com/comments/?idBook=${id}`);
        const responseData = await response.json();
        return responseData.data;
    } catch (err) {
        return console.log(err);
    }
};

export const getBooks = async () => {
    try {
        //const token = await AsyncStorage.getItem("@token");
        const response = await fetch("http://sound-aileron-337523.rj.r.appspot.com/books/?limit=1000&offset=0", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        const responseData = await response.json();
        return responseData.data;
    } catch (error) {
        console.log(error);
    }
};
