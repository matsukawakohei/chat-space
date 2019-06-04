def create
  @message = @group.messages.new(message_params)
  if @message.save
    respond_to do |format|
      format.html { redirect_to "group_messages_path(params[:group_id])" }
      format.json
    end
  else
  end
end