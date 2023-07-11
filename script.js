
     
            function openSelect(selection) {
                var i;
                var x = document.getElementsByClassName("selection");
                for (i = 0; i < x.length; i++) {
                  x[i].style.display = "none";
                }
                document.getElementById(selection).style.display = "block";
              
                var buttons = document.getElementsByClassName("tab-btns");
                for (i = 0; i < buttons.length; i++) {
                  buttons[i].classList.remove("activeAnimate");
                }
                document.querySelector("button[data-selection='" + selection + "']").classList.add("activeAnimate");
              }
              
              
              
                              
                           
              $(document).ready(function() {
                  $('.dropdown-toggle').dropdown();
              });
              
              $(".default_option").click(function(){
                $(this).parent().toggleClass("active");
              })
              
              $(".select_ul li").click(function(){
                var currentele = $(this).html();
                $(".default_option li").html(currentele);
                $(this).parents(".select_wrap").removeClass("active");
              })
              




var drag = document.querySelector("#drag");
            var path = document.querySelector("#path");
            
            var pathLength = path.getTotalLength() || 0;
            var startPoint = path.getPointAtLength(0);
            var startAngle = getRotation(startPoint, path.getPointAtLength(0.1));
            
            drag.addEventListener("mousedown", startDrag);
            
            function startDrag(event) {
              event.preventDefault();
              document.addEventListener("mousemove", dragElement);
              document.addEventListener("mouseup", stopDrag);
            }
            
            function stopDrag() {
              document.removeEventListener("mousemove", dragElement);
              document.removeEventListener("mouseup", stopDrag);
            }
            
            function dragElement(event) {
              var point = {
                x: event.clientX,
                y: event.clientY 
              };
              var containerRect = drag.parentElement.getBoundingClientRect();
              var containerOffset = {
                x: containerRect.left,
                y: containerRect.top
              };
            
              var p = closestPoint(path, pathLength, point, containerOffset);
            
              drag.style.transform = "translate(" + p.point.x + "px, " + p.point.y + "px) rotate(" + (p.rotation * (180 / Math.PI)) + "deg)";
            }
            
            
            function closestPoint(pathNode, pathLength, point, offset) {
              var precision = 8;
              var best;
              var bestLength;
              var bestDistance = Infinity;
            
              for (var scan, scanLength = 0, scanDistance; scanLength <= pathLength; scanLength += precision) {
                if ((scanDistance = distance2(scan = pathNode.getPointAtLength(scanLength))) < bestDistance) {
                  best = scan, bestLength = scanLength, bestDistance = scanDistance;
                }
              }
            
              precision /= 2;
              while (precision > 0.5) {
                var before;
                var after;
                var beforeLength;
                var afterLength;
                var beforeDistance;
                var afterDistance;
                if ((beforeLength = bestLength - precision) >= 0 && (beforeDistance = distance2(before = pathNode.getPointAtLength(beforeLength))) < bestDistance) {
                  best = before, bestLength = beforeLength, bestDistance = beforeDistance;
                } else if ((afterLength = bestLength + precision) <= pathLength && (afterDistance = distance2(after = pathNode.getPointAtLength(afterLength))) < bestDistance) {
                  best = after, bestLength = afterLength, bestDistance = afterDistance;
                } else {
                  precision /= 2;
                }
              }
            
              var len2 = bestLength + (bestLength === pathLength ? -0.1 : 0.1);
              var rotation = getRotation(best, pathNode.getPointAtLength(len2));
            
              return {
                point: {
                  x: best.x - offset.x,
                  y: best.y - offset.y
                },
                rotation: rotation
              };
            
              function distance2(p) {
                var dx = p.x - point.x;
                var dy = p.y - point.y;
                return dx * dx + dy * dy;
              }
            }
            
            function getRotation(p1, p2) {
              var dx = p2.x - p1.x;
              var dy = p2.y - p1.y;
              return Math.atan2(dy, dx);
            }

       