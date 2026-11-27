// Self-check for the money rules in reducer.js: node components/prototype/reducer.check.mjs
import assert from 'node:assert/strict';
import { reducer, START, total } from './reducer.js';

const run = (...actions) => actions.reduce(reducer, START);
const base = [{ type: 'book', catererId: 'mak-long', pkg: 'b', price: 20, pax: 500, date: '2027-03-14' }];

let s = run(...base);
assert.equal(total(s.booking), 10000);

s = run(...base, { type: 'pay', amount: 5000 });
assert.deepEqual([s.booking.paid, s.booking.released, s.booking.status], [5000, 0, 'active']);

// invoices release exactly their amount, capped at what the host has paid; the rest waits as pending
s = run(...base, { type: 'pay', amount: 5000 }, { type: 'invoice', supplier: 'Pasar', amount: 3000 }, { type: 'invoice', supplier: 'Borong', amount: 2500 });
assert.deepEqual([s.booking.released, s.booking.pending], [5000, 500]);

// paying the balance secures 100% and auto-releases the pending invoice amount
s = reducer(s, { type: 'pay', amount: 5000 });
assert.deepEqual([s.booking.paid, s.booking.released, s.booking.pending], [10000, 5500, 0]);

// "Makanan Diterima" releases everything except the final 20%; 48 hours later the rest goes out
s = reducer(s, { type: 'received' });
assert.equal(s.booking.released, 8000);
s = [1, 2, 3].reduce(st => reducer(st, { type: 'skip' }), s);
assert.deepEqual([s.booking.released, s.booking.status], [10000, 'complete']);

// a dispute freezes the final 20%
let d = run(...base, { type: 'pay', amount: 10000 }, { type: 'received' }, { type: 'dispute', dispute: { reason: 'Food ran short' } });
d = [1, 2, 3].reduce(st => reducer(st, { type: 'skip' }), d);
assert.deepEqual([d.booking.released, d.booking.status], [8000, 'dispute']);

// headcount locks once the clock reaches 14 days before
let p = run(...base, { type: 'skip' }, { type: 'pax', pax: 600 });
assert.equal(p.booking.pax, 500);

console.log('reducer checks passed');
