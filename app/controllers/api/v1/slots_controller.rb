class Api::V1::SlotsController < ApplicationController
  def index
    if slot_params[:coach_id].present?
      raise ActionController::RoutingError.new('Not Found') if coach.blank?

      slots = coach.slots
    else
      slots = Slot.all
    end

    slots = slots.includes(booking: [:student])
                 .order('start_at ASC')
                 .map {|slot| slot.attributes.merge(
                   coach: slot.coach&.attributes,
                   booking: slot.booking&.attributes&.merge(student: slot.booking.student))}

    render json: slots
  end

  def create
    start_at = slot_params[:start_at].to_time
    slot = Slot.new(
      coach_id: slot_params[:coach_id],
      start_at: start_at,
      end_at: start_at + 2.hours,
    )

    unless slot.save
      render json: { errors: slot.errors.full_messages }, status: :unprocessable_entity
      return
    end

    render json: slot
  end

  private

  def coach
    @coach ||= User.find_by(user_type: User::COACH, id: slot_params[:coach_id])
  end

  def slot_params
    params.permit(:coach_id, :start_at)
  end
end
