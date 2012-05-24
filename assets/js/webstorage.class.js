/* Exteding Object ------------ */
Object.prototype.length = function() {
  var count = 0;
  for(var prop in this) {
    if(this.hasOwnProperty(prop)) {
      ++count;
    }
  }
  return count;
}

/* Project 'Class' ------------ */
var Project = {
  projects : JSON.parse(localStorage.getItem('projects')), // JSON Object of All Projects
  get : function() {
    this.projects = JSON.parse(localStorage.getItem('projects'));
    return this.projects;
  },
  add : function (project) { // project is an array [string name,Date deadline, boolean closed]
    var newProject,
      count;
    project[2] = 0;  
    if(this.projects != null) {
      count = this.projects.length() + 1;
      this.projects[count] = project;
    }
    else {
      this.projects = {1: project};
    }
    
    newProject = JSON.stringify(this.projects);
    
    localStorage.setItem('projects',newProject);
  },
  clearAll : function () {
    this.projects = {};
    localStorage.removeItem('projects');
  },
  close : function(projectID) {
    var newProject;
    
    this.projects[projectID][2] = 1;
    
    newProject = JSON.stringify(this.projects);
    
    localStorage.setItem('projects',newProject);
  },
  remove : function(projectID) {
    var newProject;
    
    delete this.projects[projectID];
    
    newProject = JSON.stringify(this.projects);
    
    localStorage.setItem('projects',newProject);
  },
  edit : function (projectID, project) {
    var newProject;
    
    project[2] = 0;
    this.projects[projectID] = project;
    
    newProject = JSON.stringify(this.projects);
    
    localStorage.setItem('projects',newProject);
  },
  save : function() {
    localStorage.setItem('projects',this.projects);
  }
};

/* Milestone 'Class' ------------ */
var Milestone = {
  milestones : JSON.parse(localStorage.getItem('milestones')), // JSON Object of All milestones
  get : function() {
    this.milestones = JSON.parse(localStorage.getItem('milestones'));
    return  this.milestones;
  },
  add : function (milestone) { // milestone is an array [string name, Date deadline, int projectID, boolean closed]
    var newMilestone,
      count;
    milestone[3] = 0;  
    if(this.milestones != null) {
      count = this.milestones.length() + 1;
      this.milestones[count] = milestone;
    }
    else {
      this.milestones = {1: milestone};
    }
    
    newMilestone = JSON.stringify(this.milestones);
    
    localStorage.setItem('milestones',newMilestone);
  },
  clearAll : function () {
    this.milestones = {};
    localStorage.removeItem('milestones');
  },
  close : function(milestoneID) {
    var newMilestone;
    
    this.milestones[milestoneID][3] = 1;
    
    newMilestone = JSON.stringify(this.milestones);
    
    localStorage.setItem('milestones',newMilestone);
  },
  remove : function(milestoneID) {
    var newMilestone;
    
    delete this.milestones[milestoneID];
    
    newMilestone = JSON.stringify(this.milestones);
    
    localStorage.setItem('milestones',newMilestone);
  },
  edit : function (milestoneID, milestone) {
    var newMilestone;
    milestone[3] = 0;
    this.milestones[milestoneID] = milestone;
    
    newMilestone = JSON.stringify(this.milestones);
    
    localStorage.setItem('milestones',newMilestone);
  },
  save : function() {
    localStorage.setItem('milestones',this.milestones);
  }
};

/* Task 'Class' ------------ */
var Task = {
  tasks : JSON.parse(localStorage.getItem('tasks')), // JSON Object of All tasks
  get : function() {
    this.tasks = JSON.parse(localStorage.getItem('tasks'));
    return  this.tasks;
  },
  add : function (task) { // task is an array [string name, Date deadline, int milestoneID, boolean closed]
    var newTask,
      count;
    task[3] = 0;
    if(this.tasks != null) {
      count = this.tasks.length() + 1;
      this.tasks[count] = task;
    }
    else {
      this.tasks = {1: task};
    }
    
    newTask = JSON.stringify(this.tasks);
    
    localStorage.setItem('tasks',newTask);
  },
  clearAll : function () {
    this.tasks = {};
    localStorage.removeItem('tasks');
  },
  close : function(taskID) {
    var newTask;
    
    this.tasks[taskID][3] = 1;
    
    newTask = JSON.stringify(this.tasks);
    
    localStorage.setItem('tasks',newTask);
  },
  remove : function(taskID) {
    var newTask;
    
    delete this.tasks[taskID];
    
    newTask = JSON.stringify(this.tasks);
    
    localStorage.setItem('tasks',newTask);
  },
  edit : function (taskID, task) {
    var newTask;
    task[3] = 0;
    this.tasks[taskID] = task;
    
    newTask = JSON.stringify(this.tasks);
    
    localStorage.setItem('tasks',newTask);
  },
  save : function() {
    localStorage.setItem('tasks',this.tasks);
  }
};

/* Time 'Class' ------------ */
var Time = { // time is an array [Date start, Date end, float total, int taskID]
  times : JSON.parse(localStorage.getItem('times')), // JSON Object of All times
  get : function() {
    this.times = JSON.parse(localStorage.getItem('times'));
    return  this.times;
  },
  start : function (taskID) { 
    var newTime, count, time;
    
    time = [new Date(), null, null, taskID];
      
    if(this.times != null) {
      count = this.times.length() + 1;
    }
    else {
      count = 1;
      this.times = {1: time};
    }
      
    this.times[count] = time;  
    newTime = JSON.stringify(this.times);
    
    localStorage.setItem('times',newTime);
    return count;
  },
  stop : function (timeID) {
    var newTime,time,difference, mins, hrs, t1, t2;
    
    time = this.times;
    time[timeID][1] = new Date();
    t2 = new Date(time[timeID][1]);
    t1 = new Date(time[timeID][0]);
    
    difference = t2.getTime() - t1.getTime();
 
    hrs = Math.floor(difference/1000/60/60);
    difference -= hrs*1000*60*60
 
    mins = Math.floor(difference/1000/60);
    difference -= mins*1000*60
    
    time[timeID][2] = (hrs + (mins / 60)).toFixed(2);
    
    this.times = time;
    
    newTime = JSON.stringify(this.times);
    
    localStorage.setItem('times',newTime);
  },
  clearAll : function () {
    this.times = {};
    localStorage.removeItem('times');
  },
  remove : function(timeID) {
    var newTime;
    
    delete this.times[timeID];
    
    newTime = JSON.stringify(this.times);
    
    localStorage.setItem('times',newTime);
  },
  save : function() {
    localStorage.setItem('times',this.times);
  }
};

/* Get Information from Web Storage ------------ */
Project.get();
Milestone.get();
Task.get();
Time.get();

/* Project Manager Functionality ------------ */
(function($) {
  $().ready(function () {   
    // Bind subnav items to ajax calls
    $('.sub-nav').on('click','a',function(e) {
      e.preventDefault();
      var $this = $(this);
      var command = parse(/^#(.+)$/,$this.attr('href')),
        type = parse(/^(.+)Tab$/,$this.parents('li').attr('id'));
      
      $this.parents('.sub-nav').find('.active').removeClass('active');  
      $this.addClass('active');
      
      switch(type[1]) {
        case 'project':
          switch(command[1]) {
            case 'view':
              $('#' + type[1] + "Info").html('<table><thead><tr><th>Project Name</th><th>Deadline</th><th>Actions</th></tr></thead><tbody></tbody></table>');
              var projects = Project.get();
              for(var projectID in projects) {
                if(projects.hasOwnProperty(projectID)) {
                  if(projects[projectID][2] == 0) {
                    open = '<span class="open"><a href="#edit.' + projectID + '" class="nice tiny round blue button">Edit</a>  <a href="#close.' + projectID + '" class="nice tiny round black button">Complete</a> </span>';
                  }
                  else {
                    open = '<span class="closed">Completed! </span>';
                  }
                  $('#' + type[1] + "Info tbody").append('<tr><td>' + projects[projectID][0] + '</td><td>' + (projects[projectID][1] != null?projects[projectID][1]:'') + '</td><td>' + open + '<a href="#delete.' + projectID + '" class="nice tiny round blue button">Delete</a></td></tr>');
                }
              }
              break;
            case 'new':
              $('#' + type[1] + 'Info').load('ajax/' + type[1] + '.html');
              break;
            default:
              break;
          }
          break;
        case 'milestone':
          switch(command[1]) {
            case 'view':
              $('#' + type[1] + "Info").html('<table><thead><tr><th>Project</th><th>Milestone Name</th><th>Deadline</th><th>Actions</th></tr></thead><tbody></tbody></table>');
              var milestones = Milestone.get(),
                projects = Project.get();
              for(var milestoneID in milestones){
                if(milestones.hasOwnProperty(milestoneID)) {
                  var projectID = parseInt(milestones[milestoneID][2]);
                  if(milestones[milestoneID][3] == 0) {
                    open = '<span class="open"><a href="#edit.' + milestoneID + '" class="nice tiny round blue button">Edit</a>  <a href="#close.' + milestoneID + '" class="nice tiny round black button">Complete</a> </span>';
                  }
                  else {
                    open = '<span class="closed">Completed! </span>';
                  }
                  $('#' + type[1] + "Info tbody").append('<tr><td>' + projects[projectID][0] + '</td><td>' + milestones[milestoneID][0] + '</td><td>' + (milestones[milestoneID][1] != null?milestones[milestoneID][1]:'') + '</td><td>' + open + '<a href="#delete.' + milestoneID + '" class="nice tiny round blue button">Delete</a></td></tr>');
                }
              }
              break;
            case 'new':
              $('#' + type[1] + 'Info').load('ajax/' + type[1] + '.html');
              break;
            default:
              break;
          }
          break;
        case 'task':
          switch(command[1]) {
            case 'view':
              $('#' + type[1] + "Info").html('<table><thead><tr><th>Project</th><th>Milestone</th><th>Task Name</th><th>Deadline</th><th>Actions</th></tr></thead><tbody></tbody></table>');
              var open, tasks = Task.get(),
                milestones = Milestone.get(),
                projects = Project.get();
              for(var taskID in tasks){
                if(tasks.hasOwnProperty(taskID)) {
                  var milestoneID = parseInt(tasks[taskID][2]);
                    projectID = parseInt(milestones[milestoneID][2]);
                  if(tasks[taskID][3] == 0) {
                    open = '<span class="open"><a href="#start.' + taskID + '" class="nice tiny round green button">Start</a> <a href="#edit.' + taskID + '" class="nice tiny round blue button">Edit</a>  <a href="#close.' + taskID + '" class="nice tiny round black button">Complete</a> </span>';
                  }
                  else {
                    open = '<span class="closed">Completed! </span>';
                  }
                  $('#' + type[1] + "Info tbody").append('<tr><td>' + projects[projectID][0] + '</td><td>' + milestones[milestoneID][0] + '</td><td>' + tasks[taskID][0] + '</td><td>' + (tasks[taskID][1] != null?tasks[taskID][1]:'') + '</td><td>' + open + '<a href="#delete.' + taskID + '" class="nice tiny round blue button">Delete</a></td></tr>');
                }
              }
              break;
            case 'new':
              $('#' + type[1] + 'Info').load('ajax/' + type[1] + '.html');
              break;
            default:
              break;
          }
          break;
        case 'time':
          switch(command[1]) {
            case 'view':
              $('#' + type[1] + "Info").html('<table><thead><tr><th>Project</th><th>Milestone</th><th>Task Name</th><th>Deadline</th><th>Time</th></tr></thead><tbody></tbody></table>');
              var times = Time.get(),
                tasks = Task.get(),
                milestones = Milestone.get(),
                projects = Project.get();
              for(var timeID in times){
                if(times.hasOwnProperty(timeID)) {
                  var taskID = parseInt(times[timeID][3]),
                    milestoneID = parseInt(tasks[taskID][2]),
                    projectID = parseInt(milestones[milestoneID][2]);
                  $('#' + type[1] + "Info tbody").append('<tr><td>' + projects[projectID][0] + '</td><td>' + milestones[milestoneID][0] + '</td><td>' + tasks[taskID][0] + '</td><td>' + (tasks[taskID][1] != null?tasks[taskID][1]:'') + '</td><td>' + times[timeID][2] + ' hrs</td></tr>');
                }
              }
              break;
            default:
              break;
          }
          break;
        default: 
          break;      
      }
    });
    
     // Bind submit buttons to ajax calls
    $('.info').on('click','input[type=submit]', function (e) {
      e.preventDefault();
      var $this = $(this);
      var command = $this.attr('name'),
        type = parse(/^(.+)Info$/,$this.parents('.info').attr('id')),
        $form = $this.parents('form');
      switch(type[1]) {
        case 'project':
          var $name = $('input[name=name]'),
            $month = $('input[name=month]'),
            $day = $('input[name=day]'),
            $year = $('input[name=year]'),
            $form = $('#project_new'),
            year = parse(/^[0-9]{4}$/,$year.val()),
            error = false,
            deadline, name;
            
          $('#project_new').parent().find('.alert-box').remove();
          if($name.val() == '') {
            $form.before('<div class="alert-box error">Milestone Name is required.</div>');
            error = true;
          }
          if(year == null && $year.val() != '') {
            $form.before('<div class="alert-box error">Not a valid Year.</div>');
            error = true;
          }
          switch(command) {
            case 'create':
              if(!error) {
                name = $name.val();
                deadline = new Date($year.val(),$month.val(),$day.val()); 
                Project.add([name,deadline]);
                $('#' + type[1] + 'Info').html('<div class="success alert-box">New Project Create!</div>');
              }
              break;
            case 'edit':
              var projectID = parseInt($('input[name=projectID]').val());
              if(!error) {
                name = $name.val();
                deadline = new Date($year.val(),$month.val(),$day.val()); 
                Project.edit(projectID,[name,deadline]);
                $('#' + type[1] + 'Info').html('<div class="success alert-box">Project Updated!</div>');
              }
              break;
            default:
              break;
          }
          break;
        case 'milestone': 
          var $name = $('input[name=name]'),
            $month = $('input[name=month]'),
            $day = $('input[name=day]'),
            $year = $('input[name=year]'),
            $form = $('#milestone_new'),
            $project = $('select[name=projectID]'),
            year = parse(/^[0-9]{4}$/,$year.val()),
            error = false,
            deadline, name;
            
          $('#milestone_new').parent().find('.alert-box').remove();
          if($name.val() == '') {
            $form.before('<div class="alert-box error">Milestone Name is required.</div>');
            error = true;
          }
          if($project.val() == '0') {
            $form.before('<div class="alert-box error">A Project is required.</div>');
            error = true;
          }
          if(year == null && $year.val() != '') {
            $form.before('<div class="alert-box error">Not a valid Year.</div>');
            error = true;
          }
          switch(command) {
            case 'create':
              if(!error) {
                name = $name.val();
                projectID = $project.val();
                deadline = new Date($year.val(),$month.val(),$day.val()); 
                Milestone.add([name,deadline,projectID]);
                $('#' + type[1] + 'Info').html('<div class="success alert-box">New Milestone Create!</div>');
              }
              break;
            case 'edit':
              if(!error) {
                var milestoneID = $('input[name=milestoneID]').val();
                name = $name.val();
                projectID = $project.val();
                deadline = new Date($year.val(),$month.val(),$day.val()); 
                Milestone.edit(milestoneID,[name,deadline,projectID]);
                $('#' + type[1] + 'Info').html('<div class="success alert-box">Milestone Updated!</div>');
              }
              break;
            default:
              break;
          }
          break;
        case 'task':
          var $name = $('input[name=name]'),
            $month = $('input[name=month]'),
            $day = $('input[name=day]'),
            $year = $('input[name=year]'),
            $form = $('#task_new'),
            $milestone = $('select[name=milestoneID]'),
            year = parse(/^[0-9]{4}$/,$year.val()),
            error = false,
            deadline, name;
            
          $('#task_new').parent().find('.alert-box').remove();
          if($name.val() == '') {
            $form.before('<div class="alert-box error">Task is required.</div>');
            error = true;
          }
          if($milestone.val() == '0') {
            $form.before('<div class="alert-box error">A Milestone is required.</div>');
            error = true;
          }
          if(year == null && $year.val() != '') {
            $form.before('<div class="alert-box error">Not a valid Year.</div>');
            error = true;
          }
          switch(command) {
            case 'create':
              if(!error) {
                name = $name.val();
                milestoneID = $milestone.val();
                deadline = new Date($year.val(),$month.val(),$day.val()); 
                Task.add([name,deadline,milestoneID]);
                $('#' + type[1] + 'Info').html('<div class="success alert-box">New Task Create!</div>');
              }
              break;
            case 'edit':
              if(!error) {
                var taskID = $('input[name=taskID]').val();
                name = $name.val();
                milestoneID = $milestone.val();
                deadline = new Date($year.val(),$month.val(),$day.val()); 
                Task.edit(taskID,[name,deadline,milestoneID]);
                $('#' + type[1] + 'Info').html('<div class="success alert-box">Task Updated!</div>');
              }
              break;
            default:
              break;
            }
          break;  
        default:
          break;  
      }
    });
    
    // Bind link buttons to ajax calls
    $('.info').on('click','a', function (e) {
      e.preventDefault();
      var $this = $(this);
      var command = parse(/^#(.+)\.([0-9]+)$/,$this.attr('href')),
        type = parse(/^(.+)Info$/,$this.parents('.info').attr('id')),
        $form = $this.parents('form');
      switch(type[1]) {
        case 'project':
          var projectID = parseInt(command[2]),
            projects = Project.get()
            $form = $('#project_new');
          switch(command[1]) {
            case 'edit':
              $('#' + type[1] + 'Info').load('ajax/' + type[1] + '.html',function () {
                $('input[name=projectID]').val(projectID);
                $('input[name=name]').val(projects[projectID][0]);
                $('input[name=create]').attr('name','edit').val('Edit Project');
                
                var date = projects[projectID][1];
                if(date != null) {
                  $('input[name=year]').val(date.getFullYear());
                  $('input[name=month]').val(parseInt(date.getMonth()) + 1);
                  $('input[name=day]').val(date.getDate());
                }
              });
              break;
            case 'close':
              Project.close(projectID);
              $('#' + type[1] + 'Info').html('<div class="success alert-box">Project Completed!</div>');
              break;
            case 'delete':
              Project.remove(projectID);
              $('#' + type[1] + 'Info').html('<div class="success alert-box">Project Deleted!</div>');
              break;
            default:
              break;
          }
          break;
        case 'milestone':
          var milestoneID = parseInt(command[2]),
            milestones = Milestone.get(),
            projects = Project.get(),
            $form = $('#milestone_new');
          switch(command[1]) {
            case 'edit':
              $('#' + type[1] + 'Info').load('ajax/' + type[1] + '.html',function () {
                $('input[name=milestoneID]').val(milestoneID);
                $('input[name=name]').val(milestones[milestoneID][0]);
                $('input[name=create]').attr('name','edit').val('Edit Milestone');
                $('select[name=projectID]').val(milestones[milestoneID][2]);
                
                var date = milestones[milestoneID][1];
                if(date != null) {
                  $('input[name=year]').val(date.getFullYear());
                  $('input[name=month]').val(parseInt(date.getMonth()) + 1);
                  $('input[name=day]').val(date.getDate());
                }
              });
              break;
            case 'close':
              Milestone.close(milestoneID);
              $('#' + type[1] + 'Info').html('<div class="success alert-box">Milestone Completed!</div>');
              break;
            case 'delete':
              Milestone.remove(milestoneID);
              $('#' + type[1] + 'Info').html('<div class="success alert-box">Milestone Deleted!</div>');
              break;
            default:
              break;
          }
          break;
        case 'task':
          var taskID = parseInt(command[2]),
            tasks = Task.get()
            $form = $('#task_new');
          switch(command[1]) {
            case 'edit':
              $('#' + type[1] + 'Info').load('ajax/' + type[1] + '.html',function () {
                $('input[name=taskID]').val(taskID);
                $('input[name=name]').val(tasks[taskID][0]);
                $('select[name=milestoneID]').val(tasks[taskID][2]);
                $('input[name=create]').attr('name','edit').val('Edit Task');
                
                var date = tasks[taskID][1];
                if(date != null) {
                  $('input[name=year]').val(date.getFullYear());
                  $('input[name=month]').val(parseInt(date.getMonth()) + 1);
                  $('input[name=day]').val(date.getDate());
                }
              });
              break;
            case 'delete':
              Task.remove(taskID);
              $('#' + type[1] + 'Info').html('<div class="success alert-box">Task Deleted!</div>');
              break;
            case 'close':
              Task.close(taskID);
              $('#' + type[1] + 'Info').html('<div class="success alert-box">Task Completed!</div>');
              break;
            case 'start':
              timeID = Time.start(command[2]);
              $this.attr('href','#stop.' + timeID);
              $this.html('Stop').removeClass('green').addClass('red');
              break;
            case 'stop':
              var times = Time.get();
              Time.stop(command[2]);
              taskID = times[command[2]][3];
              $this.attr('href','#start.' + taskID);
              $this.html('Start').removeClass('red').addClass('green');
              break; 
            default:
              break;
          }
          break;
        default:
          break;
      }
    });
  });
  
  /* Testing ------------ */
  /*console.log(Project.get());
  console.log(Milestone.get());
  console.log(Task.get());
  console.log(Time.get());
  Project.clearAll();
  Milestone.clearAll();
  Task.clearAll();
  Time.clearAll();*/
})(jQuery);

/* Functions ------------ */
function parse(pattern, subject) {
  return pattern.exec(subject);
}

