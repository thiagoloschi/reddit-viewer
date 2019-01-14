import { formatThousands } from 'utils/numbers';

describe('numbers', () => {
  describe('formatThousands', () => {
    describe('when number is greater than 100.000', () => {
      it('should return no decimals with a k suffix', () => {
        const number = 148976;
        const result = formatThousands(number);
        expect(result).toEqual('149k');
      });
    });

    describe('when number is smaller than 100.000 but greater than 1.000', () => {
      it('should return one decimal with a k suffix', () => {
        const number = 14897;
        const result = formatThousands(number);
        expect(result).toEqual('14.9k');
      });
    });

    describe('when number is smaller than 1.000', () => {
      it('should return the number with no suffix', () => {
        const number = 148;
        const result = formatThousands(number);
        expect(result).toEqual(148);
      });
    });
  });
});
