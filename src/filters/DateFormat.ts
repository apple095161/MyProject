export default  (data: String) => {
    if (data) {
        const begin = data.split('T');
        const end = data.split('T')[1].split('.')[0];
        return `${begin[0]} ${end}`;
    }
};
