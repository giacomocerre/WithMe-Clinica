import { StyleSheet } from "react-native"

export const COLORS = {
    main: {
        first:'#006bff',
        second: '#0059d4' 
    },
    light: {
        first: '#f6f6f6',
        second:'#ccc',
        third:'#8c8c8c'
    },
    dark: {
        first: '#000000',
        second: '#333333',
    },
    error: '#F04343',
}

export const SHADOW =StyleSheet.create({
    normal: {
        shadowColor: "#212121",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
    }
  })


export const FONTS = {
    black: 'Gilroy-Black',
    heavy: 'Gilroy-Heavy',
    extraBold: 'Gilroy-ExtraBold',
    bold: 'Gilroy-Bold',
    semiBold: 'Gilroy-SemiBold',
    regular: 'Gilroy-Regular',
    medium: 'Gilroy-Medium',
    light: 'Gilroy-Light',
    thin: 'Gilroy-Thin',
    poetsen: 'Poetsen'

}

export const TYPOGRAPHY = {
    paragraph: 16,
    title: {
        xxl: 40,
        xl: 35,
        l: 30,
        m: 25,
        s: 20
    },
    text: {
        xxl: 20,
        xl: 18,
        l: 16,
        m: 14,
        s: 12
    }
}


export const MAIN_STYLE = StyleSheet.create({
    goBackTop: {
            height: 150,
            backgroundColor: COLORS.main.first,
            paddingTop: 80,
            paddingLeft: 20,
            borderBottomEndRadius: 100,
            position: "fixed",
    },
    textBlueHighlight: {
        fontFamily: FONTS.black,
        color: COLORS.main.first
    }
})


export const UI = StyleSheet.create({
    distances: {
        margin: 10,
        padding:10
    },
})

export const TEXT = StyleSheet.create({
    light1: {
        color: COLORS.light.first
    },
    light2: {
        color: COLORS.light.second
    },
    light3: {
        color: COLORS.light.third
    },
    blue1: {
        color: COLORS.main.first
    },
    blue2: {
        color: COLORS.main.second
    },
    dark1: {
        color: COLORS.dark.first
    },
    dark2: {
        color: COLORS.dark.second
    },
    red: {
        color: COLORS.error
    }
})

export const INFOBOX = StyleSheet.create({
    InfoBox: {
        shadowColor: "#212121",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 10,
        padding: 20,
        borderRadius: 10,
        marginTop: 10
    },

    InfoBoxSmall: {
        width: "48%",
    },
    InfoBoxBig: {
        width: "100%",
        paddingVertical:40
    },

    InfoBoxNormal: {
        backgroundColor: COLORS.light.first,
      },
    InfoBoxFull: {
        backgroundColor: COLORS.main.first,
    },

    InfoBoxTextDark: {
        color: COLORS.dark.first,
        fontFamily: FONTS.bold,
        fontSize: TYPOGRAPHY.text.xl,
        marginTop: 5,
    },
    InfoBoxTextLight: {
        color: COLORS.light.first,
        fontFamily: FONTS.bold,
        fontSize: TYPOGRAPHY.text.xl,
        marginTop: 5,
    }, 
})

export const BUTTON  = StyleSheet.create({
    buttonFullBlue: {
        alignItems: "center",
        borderColor: COLORS.main.first,
        borderWidth: 2,
        padding: 20,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: COLORS.main.first,
    },



    buttonFullLight: {
        alignItems: "center",
        borderColor: COLORS.light.first,
        borderWidth: 2,
        padding: 20,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: COLORS.light.first,
    },

    buttonFullRed: {
        alignItems: "center",
        borderColor: COLORS.error,
        borderWidth: 2,
        padding: 20,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: COLORS.error,
    },

    buttonOutlineBlue: {
        alignItems: "center",
        borderColor: COLORS.main.first,
        borderWidth: 2,
        padding: 20,
        marginTop: 10,
        borderRadius: 10,
    },
    buttonOutlineLight: {
        alignItems: "center",
        borderColor: COLORS.light.first,
        borderWidth: 2,
        padding: 20,
        marginTop: 10,
        borderRadius: 10,
    },
    buttonOutlineRed: {
        alignItems: "center",
        borderColor: COLORS.error,
        borderWidth: 2,
        padding: 20,
        marginTop: 10,
        borderRadius: 10,
    },

})
