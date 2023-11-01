// Welcome to your schema
//   Schema driven development is Keystone's modus operandi
//
// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
// - https://keystonejs.com/docs/config/lists

import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';

// see https://keystonejs.com/docs/fields/overview for the full list of fields
//   this is a few common fields for an example
import { text, relationship, password, timestamp, select } from '@keystone-6/core/fields';

// the document field is a more complicated field, so it has it's own package
import { document } from '@keystone-6/fields-document';
// if you want to make your own fields, see https://keystonejs.com/docs/guides/custom-fields

// when using Typescript, you can refine your types to a stricter subset by importing
// the generated types from '.keystone/types'
import type { Lists } from '.keystone/types';

export const lists: Lists = {
    User: list({
        // WARNING
        //   for this starter project, anyone can create, query, update and delete anything
        //   if you want to prevent random people on the internet from accessing your data,
        //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
        access: allowAll,

        // this is the fields for our User list
        fields: {
            // by adding isRequired, we enforce that every User should have a name
            //   if no name is provided, an error will be displayed
            name: text({ validation: { isRequired: true } }),

            email: text({
                validation: { isRequired: true },
                // by adding isIndexed: 'unique', we're saying that no user can have the same
                // email as another user - this may or may not be a good idea for your project
                isIndexed: 'unique',
            }),

            password: password({ validation: { isRequired: true } }),

            matchesWon: relationship({ ref: 'Match.winner', many: true }),
            matchesLost: relationship({ ref: 'Match.loser', many: true }),

            createdAt: timestamp({
                // this sets the timestamp to Date.now() when the user is first created
                defaultValue: { kind: 'now' },
            }),
        },
    }),

    Match: list({
        // WARNING
        //   for this starter project, anyone can create, query, update and delete anything
        //   if you want to prevent random people on the internet from accessing your data,
        //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
        access: allowAll,

        // this is the fields for our Post list
        fields: {
            date: timestamp({
                // this sets the timestamp to Date.now() when the user is first created
                defaultValue: { kind: 'now' },
            }),

            game: relationship({ ref: 'Game.matches' }),

            winner: relationship({
                ref: 'User.matchesWon',

                // this is some customisations for changing how this will look in the AdminUI
                ui: {
                    displayMode: 'select',
                    hideCreate: true,
                },

                // a Match can only have one winner
                many: false,
                hooks: {},
            }),

            winnerScore: select({
                type: 'integer',
                validation: {
                    isRequired: true,
                },
                options: [
                    { value: 0, label: '0' },
                    { value: 1, label: '1' },
                    { value: 2, label: '2' },
                    { value: 3, label: '3' },
                    { value: 4, label: '4' },
                    { value: 5, label: '5' },
                    { value: 6, label: '6' },
                    { value: 7, label: '7' },
                    { value: 8, label: '8' },
                ],
                label: 'Winner Score',
                defaultValue: 8,
            }),

            loser: relationship({
                // we could have used 'User', but then the relationship would only be 1-way
                ref: 'User.matchesLost',

                // this is some customisations for changing how this will look in the AdminUI
                ui: {
                    displayMode: 'select',
                    hideCreate: true,
                },

                //a Match can only have two particpants
                many: false,

                hooks: {
                    // Custom validation function to check if winner and loser are different players
                    // Validating before creation
                    validateInput: async ({ item, resolvedData, addValidationError, operation }) => {
                        if (!resolvedData.game?.connect?.id) {
                            addValidationError('Every match has to be assigned to a game');
                        }

                        if (operation === 'create') {
                            if (resolvedData.winner?.connect?.id === resolvedData.loser?.connect?.id) {
                                addValidationError('Winner and loser must be different players');
                            }
                        }

                        if (operation === 'update') {
                            if (
                                resolvedData.winner?.connect?.id === item?.loserId ||
                                resolvedData.loser?.connect?.id === item?.winnerId
                            ) {
                                addValidationError('Winner and loser must be different players');
                            }
                        }
                    },
                },
            }),

            loserScore: select({
                type: 'integer',
                validation: {
                    isRequired: true,
                },
                options: [
                    { value: 0, label: '0' },
                    { value: 1, label: '1' },
                    { value: 2, label: '2' },
                    { value: 3, label: '3' },
                    { value: 4, label: '4' },
                    { value: 5, label: '5' },
                    { value: 6, label: '6' },
                    { value: 7, label: '7' },
                    { value: 8, label: '8' },
                ],
                label: 'Loser Score',
            }),
        },
    }),

    Game: list({
        // WARNING
        //   for this starter project, anyone can create, query, update and delete anything
        //   if you want to prevent random people on the internet from accessing your data,
        //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
        access: allowAll,

        // this is the fields for our Post list
        fields: {
            title: text({ validation: { isRequired: true } }),
            matches: relationship({ ref: 'Match.game', many: true }),

            date: timestamp({
                // this sets the timestamp to Date.now() when the user is first created
                defaultValue: { kind: 'now' },
            }),
        },
    }),
};
