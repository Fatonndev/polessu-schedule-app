export function declination(number, txt) {
    const cases = [2, 0, 1, 1, 1, 2];
    return txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function parseRange(rangeString) {
    const result = [];

    // Разбиение первоначальной строки на элементы
    const elements = rangeString.split(',');

    // Проход по каждому элементу и добавление в массив результата в зависимости от типа элемента
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (element.includes('-')) {
            // Обработка диапазона
            const range = element.split('-');
            const start = parseInt(range[0]);
            const end = parseInt(range[1]);

            for (let j = start; j <= end; j++) {
                result.push(j);
            }
        } else {
            // Обработка обычного элемента
            result.push(parseInt(element));
        }
    }

    return result;
}
