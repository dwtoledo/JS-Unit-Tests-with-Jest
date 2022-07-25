import { objToQueryString, queryStringToObj } from './queryString';

describe('Given an object input then the output should be the corresponding queryString', () => {

    it('return the corresponding queryString', () => {
        const input = {
            name: "Douglas",
            lastName: "Toledo",
            inLoveWith: "Frontend"
        }
        expect(objToQueryString(input)).toBe(
            'name=Douglas&lastName=Toledo&inLoveWith=Frontend'
        );
    });

    it('return the corresponding queryString when Object values contain spaces', () => {
        const input = {
            name: "Douglas",
            lastName: "Toledo",
            inLoveWith: "Frontend Development"
        }
        expect(objToQueryString(input)).toBe(
            'name=Douglas&lastName=Toledo&inLoveWith=Frontend%20Development'
        );
    });

    it('return the corresponding queryString when Object values contain special characters', () => {
        const input = {
            name: "Douglas",
            lastName: "Toledo",
            socialNetworks: "@dwtoledo",
            inLoveWith: "Front-end Development"
        }
        expect(objToQueryString(input)).toBe(
            'name=Douglas&lastName=Toledo&socialNetworks=%40dwtoledo&inLoveWith=Front-end%20Development'
        );
    });

    it('return the corresponding queryString when Object values contain array attributes', () => {
        const input = {
            name: "Douglas",
            lastName: "Toledo",
            socialNetworks: "@dwtoledo",
            inLoveWith: "Front-end Development",
            abilities: ['JS', 'TDD']
        }
        expect(objToQueryString(input)).toBe(
            'name=Douglas&lastName=Toledo&socialNetworks=%40dwtoledo&inLoveWith=Front-end%20Development&abilities=JS%2CTDD'
        );
    });

    it('throw an error when object input has one or more nested objects', () => {
        const input = {
            name: "Douglas",
            lastName: "Toledo",
            socialNetworks: "@dwtoledo",
            inLoveWith: "Front-end Development",
            abilities: {
                frontend: ['HTML', 'CSS', 'JS'],
                designer: ['UX, UI']
            }
        }
        expect(() => {
            objToQueryString(input)
        }).toThrowError();
    });

});

describe('Given a queryString input then the output should be the corresponding object', () => {

    it('return the corresponding object', () => {
        const input = 'name=Douglas&lastName=Toledo&inLoveWith=Frontend';
        const output = {
            name: "Douglas",
            lastName: "Toledo",
            inLoveWith: "Frontend"
        };
        expect(queryStringToObj(input)).toEqual(output);
    });

    it('return the corresponding object when Object values contain spaces', () => {
        const input = 'name=Douglas&lastName=Toledo&inLoveWith=Frontend%20Development';
        const output = {
            name: "Douglas",
            lastName: "Toledo",
            inLoveWith: "Frontend Development"
        };
        expect(queryStringToObj(input)).toEqual(output);
    });

    it('return the corresponding object when queryString contain special characters', () => {
        const input = 'name=Douglas&lastName=Toledo&socialNetworks=%40dwtoledo&inLoveWith=Front-end%20Development';
        const output = {
            name: "Douglas",
            lastName: "Toledo",
            socialNetworks: "@dwtoledo",
            inLoveWith: "Front-end Development"
        }
        expect(queryStringToObj(input)).toEqual(output);
    });

    it('return the corresponding object when queryString values contain array attributes', () => {
        const input = 'name=Douglas&lastName=Toledo&socialNetworks=%40dwtoledo&inLoveWith=Front-end%20Development&abilities=JS%2CTDD';
        const output = {
            name: "Douglas",
            lastName: "Toledo",
            socialNetworks: "@dwtoledo",
            inLoveWith: "Front-end Development",
            abilities: ['JS', 'TDD']
        }
        expect(queryStringToObj(input)).toEqual(output);
    });

});