export const getCommentsBook = async id => {
    try {
        const response = await fetch(`http://sound-aileron-337523.rj.r.appspot.com/comments/?idBook=${id}`);
        const responseData = await response.json();
        return responseData.data;
    } catch (err) {
        return console.log(err);
    }
};
