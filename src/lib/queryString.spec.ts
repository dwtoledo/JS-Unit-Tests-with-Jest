const { objToQueryString } = require('./queryString');

describe('Given an object input then the output should be the corresponding queryString', () => {

    it('return the corresponding queryString', () => {
        const input = {
            name: "Douglas",
            lastName: "Toledo",
            inLoveWith: "Frontend"
        }
        expect(objToQueryString(input)).toBe('name=Douglas&lastName=Toledo&inLoveWith=Frontend');
    });

    it('return the corresponding queryString when Object values contain spaces', () => {
        const input = {
            name: "Douglas",
            lastName: "Toledo",
            inLoveWith: "Frontend Development"
        }
        expect(objToQueryString(input)).toBe('name=Douglas&lastName=Toledo&inLoveWith=Frontend%20Development');
    });

    it('return the corresponding queryString when Object values contain special characters', () => {
        const input = {
            name: "Douglas",
            lastName: "Toledo",
            socialNetworks: "@dwtoledo",
            inLoveWith: "Front-end Development"
        }
        expect(objToQueryString(input)).toBe('name=Douglas&lastName=Toledo&socialNetworks=%40dwtoledo&inLoveWith=Front-end%20Development');
    });
});

describe('Given a queryString input then the output should be the corresponding object', () => {

});