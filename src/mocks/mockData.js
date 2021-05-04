const MockedResponse = {
  data: {
    id: '21',
    type: 'item_availability',
    attributes: {
      start_at: '2021-05-02T00:00:00Z',
      end_at: '2021-06-30T23:59:59Z',
      available_periods: [
        [
          '2021-05-02T00:00:00.000Z',
          '2021-05-20T23:59:59.000+00:00'
        ],
        [
          '2021-05-26T00:00:00.000+00:00',
          '2021-06-30T23:59:59.999Z'
        ]
      ],
      unavailable_periods: [
        [
          '2021-05-21T00:00:00.000+00:00',
          '2021-05-25T00:00:00.000+00:00'
        ],
        [
          '2021-06-21T00:00:00.000+00:00',
          '2021-06-25T00:00:00.000+00:00'
        ]
      ],
      confirmed_inquiries: [
        [
          '2021-05-05T00:00:00.000Z',
          '2021-05-10T23:59:59.999Z',
          1
        ],
        [
          '2021-05-16T00:00:00.000Z',
          '2021-05-20T23:59:59.999Z',
          1
        ]
      ],
      requested_inquiries: []
    },
    relationships: {
      item: {
        data: {
          id: '21',
          type: 'item'
        }
      },
      user: {
        data: null
      }
    }
  }
}

export default MockedResponse
