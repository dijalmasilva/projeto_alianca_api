import EventCreateDto from '/event/dto/event-create.dto';

type EventUpdateDto = Omit<EventCreateDto, 'churchId'>;

export default EventUpdateDto;
