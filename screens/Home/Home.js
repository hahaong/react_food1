import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList
} from 'react-native';
import { FONTS, SIZES, COLORS, icons, dummyData } from "../../constants"

import { HorizontalFoodCard } from "../../components"
import { VerticalFoodCard } from "../../components"
import { FilterModel } from "../"

const Section = ({ title, onPress, children }) => {
    return (
        <View>
            {/* Header */}
            <View
                style={{
                    flexDirection: 'row',
                    marginHorizontal: SIZES.padding,
                    marginTop: 30,
                    marginBottom: 20
                }}
            >
                <Text style={{ flex: 1, ...FONTS.h3 }}>
                    {title}
                </Text>

                <TouchableOpacity
                    onPress={onPress}
                >
                    <Text style={{ color: COLORS.primary, ...FONTS.body3 }}>
                        Show All
                    </Text>
                </TouchableOpacity>

            </View>

            {/* Content */}
            {children}
        </View>

    )
}

const Home = () => {

    const [selectedCatergoryId, setSelectedCatergoryId] = React.useState(1)
    const [selectedMenuType, setSelectedMenuType] = React.useState(1)
    const [recommends, setRecommends] = React.useState([])
    const [popular, setPopular] = React.useState([])

    const [menuList, setMenuList] = React.useState([]) // 里面全是食物对象

    const [showFilterModel, setShowFilterModel] = React.useState(false)

    React.useEffect(() => {
        handleChangeCategory(selectedCatergoryId, selectedMenuType) //initial 1, 1
    }, [])

    //Handler
    function handleChangeCategory(categoryId, menuTypeId) { //initial 1, 1
        //Retrive the popular menu
        let selectedPopular = dummyData.menu.find(a => a.name == "Popular")

        //Retrive the recommended menu
        let selectedRecommend = dummyData.menu.find(a => a.name == "Recommended")

        //find menu based on the menuTypeId
        let selectedMenu = dummyData.menu.find(a => a.id == menuTypeId) // menu.list里面有一组食物对象, 返回menu, menu: {featured,nearby you, popular, newest, trending, recommended}

        //Set the recommended menu based on the categoryId
        setPopular(selectedPopular?.list.filter(a => a.categories.includes(categoryId)))

        //Set the recommended menu based on the categoryId
        setRecommends(selectedRecommend?.list.filter(a => a.categories.includes(categoryId)))

        // set menu based on the categoryID
        setMenuList(selectedMenu?.list.filter(a => a.categories.includes(categoryId))) // list 里面全是食物对象， 找出categoryid 初始化为 1 （fast food）的食物， 返回一组食物对象
    }

    //Render

    const renderSearch = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 40,
                    alignItems: 'center',
                    marginHorizontal: SIZES.padding,
                    marginVertical: SIZES.base,
                    paddingHorizontal: SIZES.radius,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.lightGray2
                }}
            >
                {/* Icons */}
                <Image
                    source={icons.search}
                    style={{
                        height: 20,
                        width: 20,
                        tintColor: COLORS.black
                    }}
                />

                {/* TextInput */}
                <TextInput
                    style={{
                        flex: 1,
                        bottom: 0,
                        marginLeft: SIZES.radius,
                    }}
                    placeholder="search food..."
                />

                {/* Filter Button */}
                <TouchableOpacity
                    onPress={() => setShowFilterModel(true)}

                >
                    <Image
                        source={icons.filter}
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.black
                        }}
                    />

                </TouchableOpacity>

            </View>
        )
    }

    function renderMenuTypes() {
        return (
            <FlatList
                horizontal
                data={dummyData.menu} //menu: {featured,nearby you, popular, newest, trending, recommended}
                keyExtractor={item => `${item.id}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 30,
                    marginBottom: 20
                }}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={{
                            marginLeft: SIZES.padding,
                            marginRight: index == dummyData.menu.length - 1 ? SIZES.padding : 0
                        }}
                        onPress={() => {
                            setSelectedMenuType(item.id)
                            handleChangeCategory(selectedCatergoryId, item.id) //item.id = menu.id eg: Feature,Nearby you
                        }}
                    >

                        <Text
                            style={{
                                color: selectedMenuType == item.id ? COLORS.primary : COLORS.black, ...FONTS.h3
                            }}
                        >
                            {item.name}
                        </Text>

                    </TouchableOpacity>
                )}
            />
        )
    }

    function renderRecommendedSection() {
        return (
            <Section
                title="Recommended"
                onPress={() => console.log("Show all recommended")}
            >
                <FlatList
                    data={recommends}
                    keyExtractor={item => `${item.id}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <HorizontalFoodCard
                            containerStyle={{
                                height: 180,
                                width: SIZES.width * 0.85,
                                marginLeft: index == 0 ? SIZES.padding : 18,
                                padding: 18,
                                marginRight: index == recommends.length - 1 ? SIZES.padding : 0,
                                alignItems: 'center'
                            }}
                            imageStyle={{
                                marginTop: 35,
                                height: 150,
                                width: 150
                            }}
                            item={item}
                            onPress={() => console.log("HorizontalFoodCard")}
                        />
                    )}
                />

            </Section>
        )
    }

    function renderPopularSection() {
        return (
            <Section
                title="Popular Near You"
                onPress={() => console.log("Show all popular items")}
            >
                <FlatList
                    data={popular}
                    keyExtractor={item => `${item.id}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <VerticalFoodCard
                            containerStyle={{
                                marginLeft: index == 0 ? SIZES.padding : 18,
                                padding: 18,
                                marginRight: index == recommends.length - 1 ? SIZES.padding : 0,
                            }}
                            item={item}
                            onPress={() => console.log("HorizontalFoodCard")}
                        />
                    )}
                />

            </Section>

        )
    }

    function renderFoodCategories() {
        return (
            <FlatList
                data={dummyData.categories}
                keyExtractor={item => `${item.id}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            height: 55,
                            marginTop: SIZES.padding,
                            marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                            marginRight: index == dummyData.categories.length - 1 ? SIZES.padding : 0,
                            paddingHorizontal: 8,
                            borderRadius: SIZES.radius,
                            backgroundColor: selectedCatergoryId == item.id ? COLORS.primary : COLORS.lightGray2
                        }}
                        onPress={() => {
                            setSelectedCatergoryId(item.id)
                            handleChangeCategory(item.id, selectedMenuType)
                        }}
                    >
                        <Image
                            source={item.icon}
                            style={{
                                marginTop: 5,
                                height: 50,
                                width: 50
                            }}
                        />

                        <Text
                            style={{
                                alignSelf: 'center',
                                marginRight: SIZES.base,
                                color: selectedCatergoryId == item.id ? COLORS.white : COLORS.darkGray,
                                ...FONTS.h3
                            }}
                        >
                            {item.name}
                        </Text>


                    </TouchableOpacity>
                )}
            />

        )
    }

    function renderDeliveryTo() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.padding
                }}
            >

                <Text style={{ color: COLORS.primary, ...FONTS.body3 }}>
                    DELIVERY TO
                </Text>

                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.base,
                        alignItems: 'center'
                    }}
                >
                    <Text style={{ ...FONTS.h3 }}>
                        {dummyData?.myProfile.address}
                    </Text>
                    <Image
                        source={icons.down_arrow}
                        style={{
                            marginLeft: SIZES.base,
                            height: 20,
                            width: 20
                        }}
                    />


                </TouchableOpacity>

            </View>

        )
    }
    return (
        <View
            style={{
                flex: 1,
            }}
        >
            {/* Search */}
            {renderSearch()}

            {/* Filter */}
            {showFilterModel &&
                <FilterModel
                    isVisible={showFilterModel}
                    onClose={() => setShowFilterModel(false)}
                />
            }


            {/* List */}
            <FlatList
                data={menuList} //食物对象属于其中一个品类（eg fast food)
                keyExtrator={(item) => `${item.id}`}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        {/* Delivery To */}
                        {renderDeliveryTo()}

                        {/* Food Categories */}
                        {renderFoodCategories()}

                        {/* popular */}
                        {renderPopularSection()}

                        {/* Recomended */}
                        {renderRecommendedSection()}

                        {/* Menu Type */}
                        {renderMenuTypes()}
                    </View>

                }
                renderItem={({ item, index }) => {
                    return (
                        <HorizontalFoodCard
                            containerStyle={{
                                height: 130,
                                alignItems: 'center',
                                marginHorizontal: SIZES.padding,
                                marginBottom: SIZES.radius
                            }}
                            imageStyle={{
                                marginTop: 20,
                                height: 110,
                                width: 110
                            }}
                            item={item}
                            onPress={() => console.log("HorizontalFoodCard")}
                        />
                    )
                }}

                ListFooterComponent={<View style={{ height: 5 }}></View>} // 垫下面（知道有这个function 就好，实际不需要）
            />
        </View>
    )
}

export default Home;