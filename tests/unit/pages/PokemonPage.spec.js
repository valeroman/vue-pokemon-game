import PokemonPage from '@/pages/PokemonPage'
import { shallowMount } from '@vue/test-utils'
import { pokemons } from '../mocks/pokemons.mock'

describe('PokemonPage Component', () => {

    let wrapper
        // let mixPokemonArraySpy

    beforeEach(() => {

        wrapper = shallowMount(PokemonPage)
    })

    test('debe hacer match con el snapshot ', () => {

        expect(wrapper.html()).toMatchSnapshot()
    })

    test('debe llamar al mixPokemonArray al montar', () => {
        const mixPokemonArraySpy = jest.spyOn(PokemonPage.methods, 'mixPokemonArray')
        shallowMount(PokemonPage)
        expect(mixPokemonArraySpy).toHaveBeenCalled()
    })

    test('debe hacer match con el snapshot cuando cargan los pokemons', () => {

        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        expect(wrapper.html()).toMatchSnapshot()
    })

    test('debe de mostrar los componentes de PokemonPicture y PokemonOption', () => {

        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        const picture = wrapper.find('pokemon-picture-stub')
        const options = wrapper.find('pokemon-options-stub')

        expect(picture.exists()).toBeTruthy()
        expect(options.exists()).toBeTruthy()

        expect(picture.attributes('pokemonid')).toBe('5')
        expect(options.attributes('pokemons')).toBeTruthy()
    })

    test('pruebas con el checkAnswer', async() => {

        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        await wrapper.vm.checkAnswer(5)

        expect(wrapper.find('h2').exists()).toBeTruthy()
        expect(wrapper.vm.showPokemon).toBe(true)
        expect(wrapper.find('h2').text()).toBe(`Correcto, ${ pokemons[0].name}`)

        await wrapper.vm.checkAnswer(10)
        expect(wrapper.vm.message).toBe(`Oops, era ${ pokemons[0].name }`)
    })



})