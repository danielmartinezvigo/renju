/* eslint-disable */
const Renju = require('../renju');

describe('Errors Test', () => {
  beforeAll(() => console.log('\nErrors Test'));
  it('SIZE_MUST_BE_INTEGER and BAD_SIZE', () => {
    expect(() => new Renju({ size: '' })).toThrow(new Error('size must be integer, size must be >= 6 and <= 100'));
  });
  it('BAD_SIZE A', () => {
    expect(() => new Renju({ size: 5 })).toThrow(new Error('size must be >= 6 and <= 100'));
  });
  it('BAD_SIZE B', () => {
    expect(() => new Renju({ size: 101 })).toThrow(new Error('size must be >= 6 and <= 100'));
  });
  it('BAD_ROWS A', () => {
    expect(() => new Renju({ rows: '' })).toThrow(new Error('rows must be string[]'));
  });
  it('BAD_ROWS B', () => {
    expect(() => new Renju({ rows: [1,2,3,4,5,6] })).toThrow(new Error('rows must be string[]'));
  });
  it('SIZE_NEQ_ROWS_LENGTH A', () => {
    expect(() => new Renju({ size: 7, rows: ['......','......','......','......','......','......'] })).toThrow(new Error('size !== rows.length'));
  });
  it('SIZE_NEQ_ROWS_LENGTH B', () => {
    expect(() => new Renju({ size: 6, rows: ['.......','.......','.......','.......','.......','.......','.......'] })).toThrow(new Error('size !== rows.length'));
  });
  it('ROWS_ITEM_LENGTH_NEQ_ROWS_LENGTH', () => {
    expect(() => new Renju({ size: 6, rows: ['.......','......','......','......','......','.......'] })).toThrow(new Error('rows[0].length !== rows.length, rows[5].length !== rows.length'));
  });
  it('INVALID_ROWS_ITEM A', () => {
    expect(() => new Renju({ size: 6, rows: ['C.....','......','......','......','......','......'] })).toThrow(new Error('rows[0] contains invalid characters'));
  });
  it('INVALID_ROWS_ITEM B', () => {
    expect(() => new Renju({ size: 6, rows: ['......','......','.....#','......','......','......'] })).toThrow(new Error('rows[2] contains invalid characters'));
  });
  it('INVALID_GAME A', () => {
    expect(() => new Renju({ size: 6, rows: ['BWW...','......','......','......','......','......'] })).toThrow(new Error('invalid game'));
  });
  it('INVALID_GAME B', () => {
    expect(() => new Renju({ size: 6, rows: ['BB....','......','......','......','......','......'] })).toThrow(new Error('invalid game'));
  });
});
