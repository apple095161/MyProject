export default  (data: String) => {
    if (data) {
        return data.split('T')[0];
    }
};
