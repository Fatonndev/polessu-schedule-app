import { Dimensions, ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import React, { memo } from "react";

const devWidth = Dimensions.get('window').width;

Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

Date.prototype.getWeek = function () {
    const one = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - one) / 86400000) + one.getDay() + 1) / 7);
}

function areEqual(prevProps, nextProps) {
    return prevProps.selected === nextProps.selected
}
const TouchableHighlightMemo = memo(Pressable, areEqual);

const days = ['ВС','ПН','ВТ','СР','ЧТ','ПТ','СБ'];
const minus = [6,  0,   1,   2,   3,   4,   5];

export default function DateSelect({ from, weekCount, defaultSelected, onChange, onChangeDay }) {
    const [selectedId, setSelectedId] = React.useState(defaultSelected);
    const [page, setPage] = React.useState(Math.floor(selectedId / 7));

    // From - это дата, откуда начинается сесместр
    from.setDate(from.getDate() - minus[from.getDay()]);

    return <ScrollView
        horizontal={true}
        pagingEnabled={true}
        ref={(ref)=> { ref.scrollTo({ x: (devWidth - 44) * page, animated: true }) }}
        onScroll={event => {
            const xOffset = event.nativeEvent.contentOffset.x + 0.1
            const currentPage = Math.floor(xOffset / (devWidth - 44))

            if (currentPage === page) {
                return;
            }

            onChange({
                pageIndex: currentPage,
                oldPageIndex: page,
                from: from.addDays(currentPage * 7),
                to: from.addDays(currentPage * 7 + 6),
                isCurrent: new Date().getWeek() === from.addDays(currentPage * 7).getWeek()
            })

            setPage(currentPage);
        }}>

        {
            (()=>{
                const out = [];

                for (let i = 0; i < weekCount; i++) {
                    out.push(
                        <View key={i + '_'} style={styles.dateContainer}>
                            {
                                (()=>{
                                    const out_l = [];

                                    for (let j = i * 7; j < i * 7 + 6; j++) {
                                        const d = from.addDays(j);

                                        if (j === selectedId) {
                                            out_l.push(
                                                <TouchableHighlightMemo selected={selectedId === j} key={j} onPress={ () => { onChangeDay(j); setSelectedId(j)} }>
                                                    <View style={styles.dateElemSelected}>
                                                        <Text style={styles.dateNameSelected}>{ days[d.getDay()] }</Text>
                                                        <Text style={styles.dateNumSelected}>{ d.getDate() }</Text>
                                                    </View>
                                                </TouchableHighlightMemo>
                                            );

                                            continue;
                                        }

                                        out_l.push(
                                            <TouchableHighlightMemo selected={selectedId === j} key={j} onPress={ () => { onChangeDay(j); setSelectedId(j)} }>
                                                <View style={styles.dateElem}>
                                                    <Text style={styles.dateName}> { days[from.addDays(j).getDay()] } </Text>
                                                    <Text style={styles.dateNum}> { d.getDate() } </Text>
                                                </View>
                                            </TouchableHighlightMemo>
                                        )
                                    }

                                    return out_l;
                                })()
                            }
                        </View>
                    )
                }

                return out;
            })()
        }
    </ScrollView>
}

const styles = StyleSheet.create({
    // Колонка в ширину даты
    dateContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        //flex: 1,
        backgroundColor: '#090909',
        padding: 7,
        marginBottom: 24,
        borderRadius: 8,
        paddingLeft: 10,
        paddingRight: 10,
        width: devWidth - 44
    },
    // Названия даты
    dateName: {
        color: '#737373',
        textAlign: 'center',
        fontFamily: 'Inter-Medium'
    },
    // Названия цифр в дате
    dateNum: {
        color: '#737373',
        textAlign: 'center',
        fontFamily: 'Inter-Regular'
    },
    // Названия даты выделено
    dateNameSelected: {
        color: '#AFADFF',
        textAlign: 'center',
        fontFamily: 'Inter-Medium'
    },
    // Названия цифрты даты выделено
    dateNumSelected: {
        color: '#8B8ABD',
        textAlign: 'center',
        fontFamily: 'Inter-Regular'
    },
    // кнопка даты (выделенная)
    dateElemSelected: {
        backgroundColor: '#181818',
        padding: 6,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 8
    },
    // кнопка даты
    dateElem: {
        padding: 6,
        paddingLeft: 12,
        paddingRight: 12,
    },
});
