import { supabase, getCurrentUserId } from '../utils/supabase';

export const eventService = {
  async createEvent(eventData) {
    const userId = getCurrentUserId();

    const { data, error } = await supabase
      .from('events')
      .insert([
        {
          user_id: userId,
          event_name: eventData.eventName || eventData.eventType,
          event_type: eventData.eventType,
          event_description: eventData.description,
          event_date: eventData.date,
          event_time: eventData.time,
          location: eventData.location,
          city: eventData.city,
          venue_type: eventData.venueType,
          audience_size: eventData.audienceSize,
          duration: eventData.duration,
          status: 'active'
        }
      ])
      .select()
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getAllEvents() {
    const userId = getCurrentUserId();

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getEventById(eventId) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async updateEvent(eventId, updates) {
    const { data, error } = await supabase
      .from('events')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', eventId)
      .select()
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async deleteEvent(eventId) {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', eventId);

    if (error) throw error;
    return true;
  }
};

export const budgetService = {
  async saveBudget(eventId, budgetData) {
    const { data: existing } = await supabase
      .from('budgets')
      .select('id')
      .eq('event_id', eventId)
      .maybeSingle();

    if (existing) {
      const { data, error } = await supabase
        .from('budgets')
        .update({
          venue_cost: budgetData.venue?.total || 0,
          catering_cost: budgetData.catering?.total || 0,
          services_cost: budgetData.services?.total || 0,
          miscellaneous_cost: budgetData.miscellaneous?.total || 0,
          grand_total: budgetData.grandTotal || 0,
          budget_details: budgetData,
          updated_at: new Date().toISOString()
        })
        .eq('id', existing.id)
        .select()
        .maybeSingle();

      if (error) throw error;
      return data;
    } else {
      const { data, error } = await supabase
        .from('budgets')
        .insert([
          {
            event_id: eventId,
            venue_cost: budgetData.venue?.total || 0,
            catering_cost: budgetData.catering?.total || 0,
            services_cost: budgetData.services?.total || 0,
            miscellaneous_cost: budgetData.miscellaneous?.total || 0,
            grand_total: budgetData.grandTotal || 0,
            budget_details: budgetData
          }
        ])
        .select()
        .maybeSingle();

      if (error) throw error;
      return data;
    }
  },

  async getBudgetByEventId(eventId) {
    const { data, error } = await supabase
      .from('budgets')
      .select('*')
      .eq('event_id', eventId)
      .maybeSingle();

    if (error) throw error;
    return data;
  }
};

export const taskService = {
  async createTask(eventId, taskData) {
    const { data, error } = await supabase
      .from('tasks')
      .insert([
        {
          event_id: eventId,
          title: taskData.title,
          description: taskData.description,
          status: taskData.status || 'pending',
          priority: taskData.priority || 'medium',
          assigned_to: taskData.assignedTo,
          due_date: taskData.dueDate,
          category: taskData.category
        }
      ])
      .select()
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getTasksByEventId(eventId) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('event_id', eventId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async updateTask(taskId, updates) {
    const { data, error } = await supabase
      .from('tasks')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', taskId)
      .select()
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async deleteTask(taskId) {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId);

    if (error) throw error;
    return true;
  }
};

export const timelineService = {
  async saveTimeline(eventId, timelineData) {
    const { data, error } = await supabase
      .from('timelines')
      .insert([
        {
          event_id: eventId,
          title: timelineData.title,
          type: timelineData.type,
          start_time: timelineData.startTime,
          duration: timelineData.duration,
          location_detail: timelineData.location,
          attendees_count: timelineData.attendees,
          description: timelineData.description,
          resources: timelineData.resources,
          assigned_to: timelineData.assignedTo,
          notes: timelineData.notes
        }
      ])
      .select()
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getTimelinesByEventId(eventId) {
    const { data, error } = await supabase
      .from('timelines')
      .select('*')
      .eq('event_id', eventId)
      .order('start_time', { ascending: true });

    if (error) throw error;
    return data || [];
  }
};

export const marketingService = {
  async saveMaterial(eventId, materialData) {
    const { data, error } = await supabase
      .from('marketing_materials')
      .insert([
        {
          event_id: eventId,
          material_type: materialData.type,
          title: materialData.title,
          content: materialData.content,
          platform: materialData.platform,
          status: materialData.status || 'draft',
          metadata: materialData.metadata
        }
      ])
      .select()
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getMaterialsByEventId(eventId) {
    const { data, error } = await supabase
      .from('marketing_materials')
      .select('*')
      .eq('event_id', eventId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }
};
