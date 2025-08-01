const getFormattedDate = (date) => {
    const parsedDate = new Date(date);

    return `${parsedDate.getDate()} / ${parsedDate.getMonth() + 1} / ${String(parsedDate.getFullYear()).slice(2)}`;
}

export { getFormattedDate };