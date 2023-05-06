function getTimeDiff(time1, time2) {
    const diff = Math.abs(time2 - time1);
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return hours * 60 + minutes;
}

export function timeDiff(arr) {
    const result = [];

    // Проход по каждому элементу массива, кроме последнего
    for (let i = 0; i < arr.length - 1; i++) {
        const time1 = convertTimeStrToMinutes(arr[i]);
        const time2 = convertTimeStrToMinutes(arr[i + 1]);
        const diff = getTimeDiff(time1[1], time2[0]);
        result.push(diff);
    }

    return result;
}

function convertTimeStrToMinutes(str) {
    return str.split('-').map((x) => {
        return (+x.split(':')[0] * 60) + +x.split(':')[1];
    });
}


export function getCurrentWeek() {
    const current = new Date();
    const day = current.getDay();
    const diff = current.getDate() - day + (day === 0 ? -6 : 1);
    const startOfWeek = new Date(current.setDate(diff));
    const endOfWeek = new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000);
    return {
        start: startOfWeek,
        end: endOfWeek
    };
}
