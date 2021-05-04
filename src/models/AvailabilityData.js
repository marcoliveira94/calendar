import convertToDayjs from '../utils/convertPeriodTodayjs'

function AvailabilityData ({ attributes }) {
  this.availablePeriods = convertToDayjs(attributes.available_periods)
  this.unavailablePeriods = convertToDayjs(attributes.unavailable_periods)
  this.confirmedInquiries = convertToDayjs(attributes.confirmed_inquiries)
  this.requestedInquiries = convertToDayjs(attributes.requested_inquiries)
}
export default AvailabilityData
