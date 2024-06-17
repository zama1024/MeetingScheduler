class Api::V1::BookingsController < ApplicationController
  def create
    booking = Booking.new
    booking.student_id = booking_params[:student_id]
    booking.slot_id = booking_params[:slot_id]

    unless booking.save
      render json: { errors: booking.errors.full_messages }, status: :unprocessable_entity
    end

    render json: booking.attributes.merge(student: booking.student)
  end

  def update
    booking = Booking.find(booking_params[:id])
    rating = booking_params[:rating]
    note = booking_params[:note]

    booking.rating = booking_params[:rating] if rating.present?
    booking.note = booking_params[:note] if note.present?

    unless booking.save
      render json: { errors: booking.errors.full_messages }, status: :unprocessable_entity
      return
    end

    render json: booking.attributes.merge(student: booking.student)
  end

  private

  def booking_params
    params.permit(:id, :student_id, :rating, :note, :slot_id)
  end
end
