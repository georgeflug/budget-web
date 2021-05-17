import { Transaction } from '../../transactionModel'
import { filterBySearchText } from './filterBySearchText'

describe('filterBySearchText', () => {

  it('should filter by postedDescription', () => {
    shouldFind('findMe').in({ postedDescription: 'hello can you findMe?' })
    shouldNotFind('goodbye').in({ postedDescription: 'hello can you findMe?' })
    shouldFind('findMe can').in({ postedDescription: 'hello can you findMe?' })
    shouldNotFind('"findMe can"').in({ postedDescription: 'hello can you findMe?' })
    shouldFind('findMe bye').in({ postedDescription: 'hello can you findMe?' })
    shouldFind('"can you findMe"').in({ postedDescription: 'hello can you findMe?' })
  })

  it('should filter by notes', () => {
    shouldFind('findMe').in({ notes: 'hello can you findMe?' })
    shouldNotFind('goodbye').in({ notes: 'hello can you findMe?' })
    shouldFind('findMe can').in({ notes: 'hello can you findMe?' })
    shouldNotFind('"findMe can"').in({ notes: 'hello can you findMe?' })
    shouldFind('findMe bye').in({ notes: 'hello can you findMe?' })
    shouldFind('"can you findMe"').in({ notes: 'hello can you findMe?' })
  })

  it('should filter by amount', () => {
    shouldFind('34').in({ amount: 341.25 })
    shouldFind('34').in({ amount: 12.34 })
    shouldNotFind('34').in({ amount: 3.40 })
    shouldFind('$34').in({ amount: 341.25 })
    shouldFind('34.10').in({ amount: 34.10 })
    shouldNotFind('56').in({ amount: 341.25 })
  })

  function shouldFind(searchText: string) {
    return {
      in: function (transaction: Partial<Transaction>) {
        testSearch(searchText, transaction, true)
      }
    }
  }

  function shouldNotFind(searchText: string) {
    return {
      in: function (transaction: Partial<Transaction>) {
        testSearch(searchText, transaction, false)
      }
    }
  }

  function testSearch(searchText: string, transaction: Partial<Transaction>, shouldBeFound: boolean) {
    const result = filterBySearchText(transaction as Transaction, searchText)

    try {
      expect(result).toEqual(shouldBeFound)
    } catch {
      throw new Error(`Expected \`${searchText}\` to ${shouldBeFound ? '' : 'not '}be found in ${JSON.stringify(transaction)}`)
    }
  }

})